# viajaachina Dify 搭建交接文档

整理日期：2026-06-10

用途：把这份文档发给另一个助手，让它专门协助完成 Dify Chatflow 搭建、Prompt 调优和知识库接入。搭建完成后，再把结果同步回 Codex 当前项目。

## 1. 项目背景

项目名称：`viajaachina`

目标用户：西班牙语母语者，第一次或低经验来中国旅行的境外游客。

核心价值：

- 用西班牙语规划中国旅行
- 帮用户选择城市和路线
- 解释 Alipay / WeChat Pay / 高铁 / 景点预约 / 签证和行前准备
- 最后一键生成完整攻略
- 支持把城市、景点、路线、准备事项保存到网站的 `Mi Viaje`

技术背景：

- 前端已上线在 Vercel
- 域名：`https://viajaachina.com`
- Dify API 已能调用
- 后端代理接口：`/api/chat.js`
- Dify API Key 已配置在 Vercel 环境变量：
  - `DIFY_API_KEY`
  - `DIFY_API_BASE=https://api.dify.ai/v1`
- 前端后续要解析 Dify 的结构化输出，保存到 `Mi Viaje`

## 2. 当前最重要问题

当前 Dify 虽然能调用，但有两个问题：

1. 回复质量不稳定，容易输出大段散文，不像产品化旅行助手。
2. 前端希望 Dify 不只输出自然语言，还要输出结构化数据：
   - 推荐城市
   - 推荐景点
   - 路线段
   - 行前准备事项
   - 后续追问问题

所以 Dify 搭建目标不是“能聊天”，而是“能驱动网站功能”。

## 3. Dify 产品原则

Dify 助手必须遵守：

- 所有回复使用西班牙语。
- 面向西语游客，不要假设用户懂中国 App、实名制、景点预约。
- 回答要帮助用户决策，不要写旅游散文。
- 如果信息不足，只问 1-2 个关键问题。
- 如果信息足够，直接给可执行建议。
- 对签证、免签、门票、政策、价格等容易变化的信息，要提醒用户确认官方渠道。
- 价格只给范围，不能说成绝对实时价格。
- 中国地图、领土和城市称呼要谨慎，不输出政治争议内容。
- 不要鼓励非法 VPN 或规避当地法规，只能说“出行前确认可用网络和合规工具”。

## 4. Chatflow 意图分类

建议建立一个问题分类器，分类标签如下：

### 4.1 `planificar_ruta`

用户想规划路线、天数、城市组合。

例子：

- “Quiero viajar a China 10 dias en octubre”
- “Tengo 12 dias, quiero Beijing, Shanghai y Xi'an”
- “Como organizo mi primera ruta por China?”

### 4.2 `descubrir_ciudades`

用户不知道去哪，想了解城市。

例子：

- “No se que ciudades visitar”
- “Que ciudades me recomiendas si me gusta historia?”
- “Me interesa comida local y naturaleza”

### 4.3 `guia_pagos`

支付相关。

例子：

- “Como pago en China?”
- “Puedo usar Alipay con Visa?”
- “Necesito WeChat Pay?”

### 4.4 `guia_transporte`

交通相关。

例子：

- “Como compro tren bala?”
- “Es mejor tren o avion?”
- “Puedo comprar billetes con pasaporte?”

### 4.5 `entradas_reservas`

景点门票和预约。

例子：

- “Como reservo la Ciudad Prohibida?”
- “Necesito reservar la Gran Muralla?”
- “Que entradas se agotan rapido?”

### 4.6 `preparacion_china`

行前准备。

例子：

- “Que apps necesito antes de ir a China?”
- “Necesito eSIM?”
- “Que debo preparar antes de viajar?”

### 4.7 `frases_chino`

常用中文短句。

例子：

- “Dame frases utiles en chino”
- “Como digo no como picante?”

### 4.8 `generar_guia_completa`

用户希望生成完整攻略。

例子：

- “Genera mi guia completa”
- “Dame el itinerario final”
- “Hazme una guia completa de viaje”

### 4.9 `pregunta_general`

普通问题或无法归类问题。

## 5. 节点结构建议

推荐 Chatflow 结构：

```text
Start
  -> Question Classifier
    -> planificar_ruta
      -> Knowledge Retrieval: destinos + transporte + entradas + pagos
      -> LLM: Ruta Planner
      -> Answer

    -> descubrir_ciudades
      -> Knowledge Retrieval: destinos
      -> LLM: City Discovery
      -> Answer

    -> guia_pagos
      -> Knowledge Retrieval: pagos + apps
      -> LLM: Payments Guide
      -> Answer

    -> guia_transporte
      -> Knowledge Retrieval: transporte
      -> LLM: Transport Guide
      -> Answer

    -> entradas_reservas
      -> Knowledge Retrieval: entradas
      -> LLM: Tickets Guide
      -> Answer

    -> preparacion_china
      -> Knowledge Retrieval: preparacion + pagos + apps + transporte
      -> LLM: Prep Guide
      -> Answer

    -> frases_chino
      -> Knowledge Retrieval: frases
      -> LLM: Phrases Guide
      -> Answer

    -> generar_guia_completa
      -> Knowledge Retrieval: all relevant docs
      -> LLM: Complete Guide Generator
      -> Answer

    -> pregunta_general
      -> Knowledge Retrieval: general docs if available
      -> LLM: General Answer
      -> Answer
```

如果 Dify 当前版本不方便一个节点接多个知识库，可以按意图后分别接知识检索。用户之前已经采用过“方案 B”：每个意图后单独添加检索节点。

## 6. 统一 System Prompt

可放在每个 LLM 节点的 System，或作为全局基础 Prompt：

```text
Eres viajaachina, un asistente de viaje para hispanohablantes que quieren viajar a China.

Responde siempre en espanol. No respondas en chino salvo que el usuario lo pida.

Tu objetivo es ayudar a tomar decisiones practicas: ciudades, ruta, transporte, pagos, entradas, preparacion y riesgos. No escribas textos largos de inspiracion turistica si el usuario necesita una decision.

Reglas:
1. Si falta informacion critica, haz solo 1 o 2 preguntas concretas.
2. Si ya hay informacion suficiente, da una recomendacion accionable.
3. Prioriza claridad, seguridad, reservas, pagos y transporte.
4. Para precios, tiempos, visados, entradas y politicas, usa rangos aproximados y pide verificar fuentes oficiales.
5. Explica los riesgos para extranjeros: idioma, pasaporte, pagos, reservas agotadas, festivos chinos y conectividad.
6. No inventes disponibilidad en tiempo real.
7. No prometas que una app o tarjeta funcionara siempre.
8. Cuando sea util, sugiere guardar ciudades, lugares o tareas en "Mi Viaje".
9. Usa un tono claro, cercano y experto, como un producto de viaje serio.

Formato de respuesta:
- Primero da una respuesta breve y clara.
- Luego organiza en secciones cortas.
- Evita parrafos demasiado largos.
- Al final, si corresponde, incluye un bloque JSON estructurado entre las etiquetas:
<viajaachina_data>
...
</viajaachina_data>

El JSON debe ser valido y no debe incluir comentarios.
```

## 7. 结构化输出规范

所有重要节点尽量在答案最后输出：

```text
<viajaachina_data>
{
  "intent": "planificar_ruta",
  "summary": "Resumen breve",
  "recommended_cities": [],
  "places_to_consider": [],
  "route_segments": [],
  "prep_tasks": [],
  "follow_up_questions": []
}
</viajaachina_data>
```

字段说明：

### 7.1 `recommended_cities`

```json
{
  "city_id": "beijing",
  "city_name": "Beijing",
  "reason": "Historia imperial y Gran Muralla",
  "days": 3
}
```

### 7.2 `places_to_consider`

```json
{
  "place_name": "Ciudad Prohibida",
  "city_id": "beijing",
  "city_name": "Beijing",
  "why": "Imprescindible para una primera visita"
}
```

### 7.3 `route_segments`

```json
{
  "from": "Beijing",
  "to": "Xi'an",
  "transport": "tren de alta velocidad",
  "time": "4.5-6 h",
  "price": "aprox. 515-700 RMB",
  "note": "Comprar con pasaporte y antelacion."
}
```

### 7.4 `prep_tasks`

```json
{
  "category": "pagos",
  "task": "Configurar Alipay con tarjeta internacional",
  "priority": "alta"
}
```

### 7.5 `follow_up_questions`

最多 2 个问题。

```json
[
  "¿En que fechas exactas viajas?",
  "¿Llegas y sales por la misma ciudad?"
]
```

## 8. 各节点 Prompt 模板

### 8.1 Ruta Planner

```text
El usuario quiere planificar una ruta por China.

Usa el contexto del usuario y la informacion recuperada de la base de conocimiento.

Debes:
1. Identificar si hay suficientes datos: dias, mes/fecha, intereses, presupuesto, ritmo, ciudades deseadas.
2. Si falta algo critico, pregunta maximo 2 cosas.
3. Si hay datos suficientes, recomienda una ruta realista.
4. No metas demasiadas ciudades. Para primer viaje, prioriza claridad sobre cantidad.
5. Incluye transporte recomendado entre ciudades.
6. Menciona riesgos de fechas festivas, entradas y pagos cuando aplique.
7. Incluye JSON estructurado con ciudades, lugares, tramos y tareas.

Responde siempre en espanol.
```

### 8.2 City Discovery

```text
El usuario no sabe que ciudades visitar en China.

Debes recomendar ciudades segun intereses:
- historia
- comida local
- naturaleza
- tecnologia
- compras
- familia
- primera vez
- presupuesto
- ritmo tranquilo o intenso

No des una lista generica. Ayuda a decidir.

Para cada ciudad recomendada, explica:
- por que encaja
- cuantos dias dedicar
- que lugar o experiencia representa mejor esa ciudad
- que riesgo o dificultad tiene para un extranjero

Incluye JSON con recommended_cities y places_to_consider.

Responde siempre en espanol.
```

### 8.3 Payments Guide

```text
El usuario pregunta sobre pagos en China.

Debes explicar de forma practica:
- Alipay
- WeChat Pay
- tarjetas internacionales
- efectivo
- pagos fallidos
- verificacion con pasaporte
- que hacer antes de viajar
- que hacer al llegar

No prometas compatibilidad absoluta. Usa lenguaje prudente.

Incluye una mini checklist y JSON con prep_tasks.

Responde siempre en espanol.
```

### 8.4 Transport Guide

```text
El usuario pregunta sobre transporte en China.

Debes cubrir:
- tren de alta velocidad
- vuelos domesticos
- metro
- taxi / ride hailing
- compra con pasaporte
- estaciones grandes
- tiempo de llegada recomendado
- equipaje

Si el usuario menciona dos ciudades, compara tren y avion con rangos aproximados.

Incluye JSON con route_segments si hay ciudades claras, y prep_tasks si aplica.

Responde siempre en espanol.
```

### 8.5 Tickets Guide

```text
El usuario pregunta sobre entradas, reservas o atracciones.

Debes explicar:
- que lugares suelen requerir reserva
- uso de pasaporte
- antelacion recomendada
- riesgos en festivos chinos
- alternativas si no consigue entrada
- cuando usar Trip.com u opciones oficiales

Incluye places_to_consider y prep_tasks.

Responde siempre en espanol.
```

### 8.6 Prep Guide

```text
El usuario pregunta por preparacion antes de viajar a China.

Debes organizar la respuesta por bloques:
- entrada / visado
- pagos
- internet / eSIM
- mapas / traduccion
- transporte
- entradas
- salud y seguridad basica

Debes separar:
- imprescindible antes de volar
- recomendable
- revisar segun ciudad y fecha

Incluye JSON con prep_tasks.

Responde siempre en espanol.
```

### 8.7 Complete Guide Generator

```text
El usuario quiere generar una guia completa de viaje.

Debes crear una guia final, clara y accionable.

Estructura:
1. Resumen del viaje
2. Ruta recomendada por dias
3. Ciudades y lugares clave
4. Transporte entre ciudades
5. Pagos y apps necesarias
6. Entradas y reservas
7. Preparacion antes de viajar
8. Riesgos y consejos para extranjeros
9. Checklist final

Si faltan datos esenciales, pregunta maximo 2 cosas antes de generar.

Incluye JSON estructurado con recommended_cities, places_to_consider, route_segments y prep_tasks.

Responde siempre en espanol.
```

### 8.8 General Answer

```text
Responde la pregunta del usuario de forma breve y util.

Si la pregunta tiene relacion con viajar a China, conecta la respuesta con decisiones practicas.

Si no sabes o la informacion puede cambiar, dilo claramente y recomienda verificar fuentes oficiales.

Incluye JSON solo si aparecen ciudades, lugares, ruta o tareas de preparacion utiles para guardar.

Responde siempre en espanol.
```

## 9. 测试问题

搭建完成后，用这些问题测试：

### 测试 1：路线

```text
Quiero viajar a China 10 dias en octubre. Es mi primera vez, me interesa historia, comida local y tren de alta velocidad. No se si elegir Beijing, Xi'an, Shanghai o Chengdu. Tambien necesito saber como pagar con Alipay y reservar entradas.
```

期望：

- 不要大段废话
- 推荐 2-3 城市路线
- 提醒十一黄金周风险
- 提到 Alipay 和门票
- 输出 JSON

### 测试 2：不知道去哪

```text
No se que ciudades visitar en China. Me gusta la historia, la comida local y no quiero un viaje demasiado caro.
```

期望：

- 推荐 Beijing + Xi'an + Chengdu 或类似组合
- 解释为什么
- 输出 recommended_cities 和 places_to_consider

### 测试 3：支付

```text
Soy de Mexico. Puedo pagar en China con mi tarjeta o necesito Alipay?
```

期望：

- 解释 Alipay / WeChat Pay / 现金
- 不承诺 100% 可用
- 输出 prep_tasks

### 测试 4：完整攻略

```text
Genera una guia completa para mi primer viaje a China de 12 dias con Beijing, Xi'an y Shanghai.
```

期望：

- 按天或阶段输出
- 包含交通、支付、门票、准备
- 输出完整 JSON

## 10. 搭建完成后需要回传的信息

请另一个助手完成后，整理以下内容返回：

1. Dify App 类型：Chatflow / Agent / Chatbot
2. 模型名称
3. 节点列表截图或文字版节点结构
4. 每个 LLM 节点的最终 Prompt
5. 知识库连接方式
6. 是否已开启 API
7. 测试问题和 Dify 实际回复
8. 是否成功输出 `<viajaachina_data>` JSON
9. 需要前端配合解析的字段
10. 仍然存在的问题

## 11. 给另一个助手的直接指令

可以复制下面这段给另一个助手：

```text
你现在专门负责帮我搭建 viajaachina 的 Dify Chatflow。请先阅读我提供的 DIFY_SETUP_GUIDE.md，然后一步一步指导我在 Dify 后台配置。所有 Prompt 必须使用西班牙语，回答也必须规定为西班牙语。目标不是普通聊天，而是让 Dify 输出可驱动前端的结构化旅行数据，包括 recommended_cities、places_to_consider、route_segments、prep_tasks 和 follow_up_questions。请在每一步给我明确要点、节点名称、Prompt 文本和测试方法。
```

