# viajaachina 项目交接文件

最后整理日期：2026-06-10

## 1. 当前工作区地址

真正的网站项目根目录：

```bash
/Users/shuhanxu/Documents/Codex/2026-06-09/1-agent-chatflow-2-ai/viajaachina.com
```

外层目录：

```bash
/Users/shuhanxu/Documents/Codex/2026-06-09/1-agent-chatflow-2-ai
```

线上域名：

```text
https://viajaachina.com
```

本地预览常用地址：

```text
http://127.0.0.1:8091/
```

说明：当前项目主要是静态网站结构，核心文件在项目根目录：

- `index.html`
- `app.js`
- `styles.css`
- `api/chat.js`
- `api/china-map.js`
- `assets/`
- `static-site/`

重要规则：如果修改根目录的 `index.html`、`app.js`、`styles.css`，通常也要同步复制到：

- `static-site/index.html`
- `static-site/app.js`
- `static-site/styles.css`

这样部署版本和本地版本不容易脱节。

## 2. 项目定位

项目名称：`viajaachina`

产品定位：

面向西班牙语母语者的中国旅行 AI 规划网站，帮助境外游客解决第一次来中国时最难的几个问题：

- 不知道去哪些城市
- 不知道如何安排路线
- 不会用 Alipay / WeChat Pay
- 不熟悉高铁、实名制、护照购票
- 不知道哪些景点需要预约
- 不清楚签证、免签、eSIM、VPN、翻译、地图等行前准备
- 希望用西班牙语快速得到完整攻略

简历定位：

这个项目要体现 AI 产品经理能力，不只是一个网页：

- 用户痛点拆解
- AI Chatflow 设计
- 知识库 RAG
- 结构化行程生成
- 用户记忆和收藏系统
- SEO 自然流量策略
- Dify + DeepSeek + Supabase + Vercel 的产品化落地

## 3. 已完成内容

### 3.1 首页和视觉

已完成：

- 网站名称改为 `viajaachina`
- 西语首页
- Hero 视频背景
- 首页强调免费使用
- 顶部按钮：`Gratis`、`Mi Viaje`
- 主按钮：`Generar itinerario gratis`
- 西语 Chatflow 模拟体验

### 3.2 城市卡片

已完成：

- 16 个中国热门目的地卡片
- 一行四个卡片布局
- 卡片支持收藏
- 部分城市已替换真实图片
- 卡片有城市特色、适合人群、推荐理由
- 城市详情抽屉已初步实现

目前重点城市详情较完整：

- Beijing / Pekin
- Shanghai
- Xi'an
- Chengdu
- Shenzhen

其他城市还有通用 fallback，后面需要继续补内容。

### 3.3 地图和路线

已完成：

- 地图已修复，不再是一条线
- 使用完整中国地图 SVG 文件：
  - `assets/china-map-complete.svg`
- 城市点可点击
- 支持多选城市
- 按选择顺序生成路线段
- 不走模型，前端直接展示交通时间、价格、建议
- 收藏城市有次级高亮

重要提醒：

- 用户很在意地图“领土完整”和呈现效果。
- 地图不要再依赖不稳定的外部 GeoJSON 接口作为唯一方案。
- 当前本地 SVG 方案比之前稳定。

### 3.4 行前准备中心

已完成第一版：

- 签证/免签判断入口
- Alipay / WeChat Pay 设置清单
- eSIM / VPN / 地图 / 翻译 App 清单
- 高铁购票、实名制、护照注意事项
- 常见风险：节假日、预约、语言、支付失败
- 每个准备事项有更具体说明，不只是打勾
- 加了 AI 提问按钮，之后可接 Dify

### 3.5 Mi Viaje 智能旅行记录

已完成前端 demo：

- 入口更醒目：
  - 顶部 `Mi Viaje`
  - 右下角悬浮入口
- 侧边弹窗形式
- 支持保存：
  - 收藏城市
  - 收藏景点
  - 路线
  - 准备情况
  - 个人偏好
  - 记忆文本
- 支持用户手动增删部分内容
- 景点字段已加入
- 城市和景点有初步关联

已实现自动识别思路：

- 前端会扫描用户和 AI 消息里的景点名称
- 识别到景点后显示“检测到的景点” chips
- 用户点击即可保存到 `Mi Viaje`
- 暂时不是完全自动保存，避免误存

后续计划：

- Dify 输出结构化字段 `places_to_consider`
- 前端读取结构化字段后生成保存按钮
- 对未知景点用 AI 判断所属城市
- 最终形成“AI 对话中随时收藏景点”的体验

### 3.6 Dify 接入

已完成：

- Vercel 环境变量里已配置 Dify API Key
- `/api/chat.js` 已实现 Dify 代理
- `/api/health.js` 可检查是否配置 key
- Dify 调用曾经测试成功
- Dify API Key 只能放在 Vercel Environment Variables 的 `DIFY_API_KEY`，不能写进前端代码或提交到 Git。

已知问题：

1. 调用 Dify 过程中，前端本地 demo 回复有时会先出现。
2. 当前 Dify 生成内容质量不稳定，不符合最终产品要求。
3. Dify Prompt 需要重构。
4. 需要让 Dify 更强制地输出结构化数据，而不是大段散文。

### 3.7 Supabase / 账户

已完成：

- 前端账户 demo
- 本地 localStorage 保存：
  - 用户偏好
  - 收藏城市
  - 收藏景点
  - 路线
  - 准备情况
  - 记忆文本

未完成：

- Supabase Auth
- Supabase 数据表
- 真实云端保存
- 多设备同步
- 登录后恢复历史记录

### 3.8 SEO

已完成初步 SEO：

- 页面 title 改为西语搜索友好方向
- meta description
- meta keywords
- canonical
- robots
- Open Graph
- Twitter Card
- WebApplication JSON-LD
- FAQPage JSON-LD
- 首页新增 SEO 内容区
- 首页新增 FAQ 区
- 页面醒目强调网站免费

当前已覆盖关键词方向：

- viajar a China gratis
- viaje a China
- itinerario China
- China en 10 dias
- planificador China gratis
- Alipay China
- WeChat Pay China
- tren bala China
- visa China
- turismo China en espanol

下一阶段 SEO 重点：

- 做独立长尾页面，而不是只堆首页关键词。

建议页面：

- `/viajar-a-china-por-primera-vez`
- `/itinerario-china-10-dias`
- `/alipay-china-extranjeros`
- `/wechat-pay-china-extranjeros`
- `/tren-bala-china`
- `/visa-china-espanoles`
- `/visa-china-mexicanos`
- `/mejores-ciudades-china`
- `/que-apps-usar-en-china`
- `/china-sin-efectivo`

## 4. Dify 完整规划

### 4.1 Dify 后台模型

后台计划：

- Dify Chatflow
- 模型：DeepSeek Chat
- 回复语言：必须西班牙语
- 用户界面语言：西班牙语
- 知识库：已由用户配置，当前是一个或多个旅行知识文件

### 4.2 Chatflow 意图分类

当前规划的意图：

1. `planificar_ruta`
   - 用户知道大概想去中国，希望规划路线
   - 输出城市组合、天数分配、交通建议、预算提醒

2. `descubrir_ciudades`
   - 用户不知道去哪
   - 根据兴趣、季节、预算、同行人推荐城市

3. `guia_pagos`
   - Alipay、WeChat Pay、现金、银行卡、支付失败

4. `guia_transporte`
   - 高铁、飞机、地铁、打车、实名制、护照购票

5. `entradas_reservas`
   - 景点预约、门票、护照、节假日、提前多久订

6. `preparacion_china`
   - 签证、免签、eSIM、VPN、地图、翻译 App、行前清单

7. `frases_chino`
   - 常用中文短句

8. `generar_guia_completa`
   - 用户要求一键生成完整攻略

9. `pregunta_general`
   - 普通问题，不需要进入复杂路线

### 4.3 Dify 知识库连接原则

当前用户已经配置过知识库关系。

建议：

- 每个意图后单独接知识检索节点。
- 查询语句不要只放用户原文，要拼接意图关键词。
- Dify 检索不足时，允许大模型用常识补充，但必须标注“不确定请以官方信息为准”。

知识库应该覆盖：

- 目的地城市介绍
- 支付和 App
- 高铁交通
- 门票预约
- 行前准备
- 签证/免签
- 常用中文
- 风险提醒

### 4.4 Dify Prompt 总原则

所有 Prompt 必须使用西班牙语。

系统要求：

- Siempre responde en espanol.
- No respondas en chino salvo que el usuario lo pida.
- Eres viajaachina, un asistente de viaje para hispanohablantes que visitan China.
- Tu objetivo no es impresionar con texto largo, sino ayudar a tomar decisiones.
- Si falta informacion critica, pregunta solo 1 o 2 preguntas.
- Si ya hay informacion suficiente, da una recomendacion accionable.
- Prioriza seguridad, reservas, pagos, transporte y claridad.
- Cuando menciones precios, usa rangos aproximados y aclara que pueden cambiar.
- Para visados, entradas y normas oficiales, recomienda verificar fuentes oficiales.

### 4.5 Dify 输出结构建议

为了让前端能保存城市、景点、路线和准备事项，Dify 后面不要只输出自然语言。建议要求 Dify 在答案末尾输出隐藏或可解析的 JSON。

建议结构：

```json
{
  "intent": "planificar_ruta",
  "summary": "Resumen breve para el usuario",
  "recommended_cities": [
    {
      "city_id": "beijing",
      "city_name": "Beijing",
      "reason": "Historia imperial y Gran Muralla",
      "days": 3
    }
  ],
  "places_to_consider": [
    {
      "place_name": "Ciudad Prohibida",
      "city_id": "beijing",
      "city_name": "Beijing",
      "why": "Imprescindible para una primera visita"
    }
  ],
  "route_segments": [
    {
      "from": "Beijing",
      "to": "Xi'an",
      "transport": "tren de alta velocidad",
      "time": "4.5-6 h",
      "price": "aprox. 515-700 RMB"
    }
  ],
  "prep_tasks": [
    {
      "category": "pagos",
      "task": "Configurar Alipay con tarjeta internacional",
      "priority": "alta"
    }
  ],
  "follow_up_questions": [
    "¿En que fechas exactas viajas?"
  ]
}
```

前端下一步可以读取：

- `recommended_cities` -> 一键保存城市
- `places_to_consider` -> 一键保存景点
- `route_segments` -> 保存路线
- `prep_tasks` -> 加入行前准备中心

### 4.6 Dify 下一步执行计划

优先级 1：修复前端回复时序

- 当前问题：Dify 调用时，本地 demo 回复可能先弹出。
- 目标：如果 Dify 可用，优先显示 Dify；只有 Dify 失败时才 fallback 到 demo。

优先级 2：重写 Dify 主 Prompt

- 目标：少写长篇散文，多输出结构化建议。
- 控制回答长度。
- 强制先问关键问题，或直接给路线。

优先级 3：每个意图节点 Prompt 重构

- `planificar_ruta`
- `descubrir_ciudades`
- `guia_pagos`
- `guia_transporte`
- `entradas_reservas`
- `preparacion_china`
- `generar_guia_completa`
- `pregunta_general`

优先级 4：结构化输出

- 加入 `places_to_consider`
- 加入 `recommended_cities`
- 加入 `prep_tasks`
- 加入 `route_segments`

优先级 5：前端解析 Dify 结构

- 自动显示“保存到 Mi Viaje”按钮
- 自动填入城市、景点、准备事项
- 让用户确认后保存，避免误存

## 5. Supabase 下一步计划

目标：

把当前 localStorage 账户 demo 升级为真实账户系统。

建议数据表：

### 5.1 `profiles`

字段：

- `id`
- `user_id`
- `name`
- `language`
- `travel_style`
- `budget_level`
- `interests`
- `memory_text`
- `created_at`
- `updated_at`

### 5.2 `saved_cities`

字段：

- `id`
- `user_id`
- `city_id`
- `city_name`
- `note`
- `created_at`

### 5.3 `saved_places`

字段：

- `id`
- `user_id`
- `place_id`
- `place_name`
- `city_id`
- `city_name`
- `source`
- `note`
- `created_at`

### 5.4 `saved_routes`

字段：

- `id`
- `user_id`
- `title`
- `cities`
- `segments`
- `days`
- `budget`
- `created_at`

### 5.5 `prep_progress`

字段：

- `id`
- `user_id`
- `task_id`
- `status`
- `note`
- `updated_at`

### 5.6 `chat_memories`

字段：

- `id`
- `user_id`
- `summary`
- `raw_notes`
- `created_at`
- `updated_at`

## 6. 当前代码关键位置

### Dify

- `api/chat.js`
- `api/health.js`
- `app.js` 中：
  - `callDifyAgent`
  - `state.difyConversationId`
  - `viajaachina:dify_conversation_id`

### 地图

- `assets/china-map-complete.svg`
- `app.js` 中：
  - `renderRouteMap`
  - 城市坐标数据
  - 路线交通数据

### Mi Viaje

- `index.html` 中：
  - `tripHubDrawer`
  - `tripHubCountTop`
  - `tripHubCountFab`
- `app.js` 中：
  - `defaultAccount`
  - `favoritePlaces`
  - `placesCatalog`
  - `detectPlaces`
  - `addPlaceCandidateMessage`
  - `renderTripHub`
  - `openTripHub`
  - `closeTripHubDrawer`

### SEO

- `index.html` head
- `seo-intro`
- `seo-faq`
- JSON-LD:
  - `WebApplication`
  - `FAQPage`

## 7. 已知问题清单

1. Dify 生成内容质量需要重构。
2. Dify 调用时，前端 demo 回复有时抢先出现。
3. Supabase 还没真实接入。
4. 城市详情只有重点城市较完整。
5. 景点 catalog 还不够丰富。
6. SEO 目前只是首页基础版，需要独立长尾页面。
7. 地图已经修好，但后续不要轻易换回外部接口单点依赖。
8. 部署前要确认根目录和 `static-site/` 是否同步。
9. Dify 的 `frases_chino` 分支目前还没有专门知识库，后续需要补“旅行中文短句”知识文件。

## 8. 推荐下一步优先级

### 第一优先级：Dify 体验修复

原因：这是项目作为 AI 产品经理案例的核心。

要做：

- 修复 Dify / demo 回复时序
- 重写 Dify Prompt
- 控制回答质量
- 支持结构化输出

### 第二优先级：Mi Viaje 和 AI 联动

原因：这是产品特色，不只是普通攻略站。

要做：

- Dify 输出景点、城市、路线
- 前端一键保存
- 让用户感觉“AI 真的记住了我”

### 第三优先级：Supabase

原因：让 demo 变成真实产品。

要做：

- 注册/登录
- 云端保存收藏和记忆
- 多设备同步

### 第四优先级：SEO 长尾页面

原因：自然流量核心。

要做：

- 建 5-10 个西语长尾落地页
- 每页解决一个具体问题
- 内链回首页和 AI 规划器

### 第五优先级：作品集包装

原因：用于转 AI 产品经理。

要做：

- 写项目背景
- 用户痛点
- 产品架构
- Chatflow 设计
- 关键指标
- 迭代记录
- 上线链接和截图

## 9. 给下一个接管终端的第一句话

可以直接把下面这段发给新终端：

```text
请接管 viajaachina 项目。项目根目录是：
/Users/shuhanxu/Documents/Codex/2026-06-09/1-agent-chatflow-2-ai/viajaachina.com

请先阅读 HANDOFF.md，然后继续开发。注意：修改 index.html、app.js、styles.css 后要同步 static-site/ 下同名文件。当前优先任务是修复 Dify 体验：避免 demo 回复抢先出现，重构西语 Prompt，并让 Dify 输出 recommended_cities、places_to_consider、route_segments、prep_tasks 这类结构化数据，供 Mi Viaje 保存城市/景点/路线/准备事项。
```
