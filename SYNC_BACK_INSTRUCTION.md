# Dify 搭建完成后的同步指令

用途：另一个助手帮你搭建完 Dify 后，让它按下面格式输出。然后你把输出内容发回当前 Codex 对话，我就能同步记忆并继续改前端。

## 给另一个助手的同步指令

请复制下面这段给另一个助手：

```text
请把本次 Dify 搭建结果整理成一份“同步给 Codex 的交接总结”。请严格按下面结构输出：

1. Dify App 基本信息
- App 类型：
- App 名称：
- 模型：
- API 是否已开启：
- API Base：
- 是否仍使用原来的 DIFY_API_KEY：

2. 最终 Chatflow 节点结构
请用文字列出完整节点顺序，例如：
Start -> Question Classifier -> planificar_ruta -> Knowledge Retrieval -> LLM -> Answer

3. 意图分类标签
请列出所有分类标签，以及每个标签代表什么。

4. 知识库连接
请说明每个意图后接了哪些知识库或文件。

5. 最终 System Prompt
请贴出最终版本。

6. 每个 LLM 节点 Prompt
请分别贴出：
- planificar_ruta
- descubrir_ciudades
- guia_pagos
- guia_transporte
- entradas_reservas
- preparacion_china
- frases_chino
- generar_guia_completa
- pregunta_general

7. 结构化输出格式
请贴出最终要求 Dify 输出的 JSON 格式，尤其是：
- recommended_cities
- places_to_consider
- route_segments
- prep_tasks
- follow_up_questions

8. 测试结果
请至少提供 3 个测试问题和 Dify 实际回复摘要，并说明是否成功输出 <viajaachina_data>。

9. 前端需要修改的地方
请告诉 Codex 需要如何改 app.js / api/chat.js，例如：
- 是否需要解析 <viajaachina_data>
- 是否需要关闭 demo fallback
- 是否需要新增字段
- 是否需要保存 conversation_id

10. 遗留问题
请列出还没解决的问题和下一步建议。

最后，请给出一句简短结论：这个 Dify Chatflow 是否已经可以接入 viajaachina 前端。
```

## 发回当前 Codex 时的指令

当另一个助手给你上面的总结后，把它复制回当前 Codex 对话，并加上这句话：

```text
请根据这份 Dify 同步总结，更新你的项目记忆，并开始修改 viajaachina 前端，让它正确接入新的 Dify Chatflow。
```

## 当前 Codex 需要记住的下一步

收到 Dify 同步总结后，当前 Codex 应优先做：

1. 更新 `HANDOFF.md`
2. 检查 `api/chat.js` 是否需要适配 Dify 输入/输出
3. 修改 `app.js`：
   - 优先等待 Dify 回复
   - Dify 失败才使用 demo fallback
   - 解析 `<viajaachina_data>` JSON
   - 把 `recommended_cities` 显示为保存城市按钮
   - 把 `places_to_consider` 显示为保存景点按钮
   - 把 `route_segments` 显示为保存路线按钮
   - 把 `prep_tasks` 显示为加入准备清单按钮
4. 同步修改 `static-site/app.js`
5. 测试至少 3 个问题

