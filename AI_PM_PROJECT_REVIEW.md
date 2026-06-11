# viajaachina AI 产品经理求职复盘材料

整理日期：2026-06-11

## 1. 项目一句话

`viajaachina` 是一个面向西班牙语游客的中国旅行 AI Planner。它通过对话式需求收集、城市推荐、路线地图、行前准备、账户收藏和个人记忆，帮助第一次来中国的境外游客把模糊需求转化为可执行攻略。

线上域名：

```text
https://viajaachina.com
```

当前工作区：

```text
/Users/shuhanxu/Documents/Codex/2026-06-09/1-agent-chatflow-2-ai/viajaachina.com
```

本地预览：

```text
http://127.0.0.1:8091/
```

## 2. 项目背景和用户痛点

目标用户：

- 西班牙语母语者
- 第一次或低频来中国旅行的境外游客
- 对中国城市、交通、支付、实名制、签证、预约流程不熟悉的人

核心痛点：

- 不知道中国哪些城市适合自己
- 不知道如何安排跨城市路线
- 不理解高铁、护照购票、实名制和车站流程
- 不会设置 Alipay / WeChat Pay，担心支付失败
- 不清楚 eSIM、VPN、地图、翻译 App 等行前准备
- 不知道热门景点是否需要预约、在哪里买票
- 普通 ChatGPT 回答太长，缺少可保存、可点击、可执行的旅行资产

产品机会：

普通通用聊天工具只能回答问题，但用户真正需要的是“从提问到攻略资产”的闭环。因此 viajaachina 的目标不是做一个聊天窗口，而是做一个面向旅行决策的 AI 产品。

## 3. 产品定位

产品定位：

```text
AI travel planner for Spanish-speaking travelers visiting China.
```

中文解释：

面向西语游客的中国旅行 AI 助手，聚焦路线、城市、支付、交通、预约和行前准备。

差异化：

- 不是普通 ChatGPT 对话，而是 Chatflow 引导式体验
- 不只生成文字，而是把结果转成城市、景点、路线、清单、记忆等结构化资产
- 前端提供地图、收藏、Mi Viaje、准备中心和账户同步
- 面向境外游客的真实痛点，而不是泛泛旅行攻略

## 4. 当前第一版已完成能力

### 首页和基础体验

- 西语首页
- Hero 视频背景
- 明确强调免费使用
- 移动端适配优化
- 顶部导航：`Mi Viaje`、登录、注册、新旅程、退出登录
- 传统 footer：联系邮箱、隐私说明、条款说明、免责声明
- SEO 基础优化：title、description、keywords、canonical、Open Graph、FAQ JSON-LD、WebApplication JSON-LD

### AI Chatflow 前端体验

- 欢迎语引导用户提问
- 明确的问题分类入口
- Dify 调用期间显示真实加载状态
- 支持 Dify 返回结构化数据
- 前端解析结构化字段并生成卡片式结果
- follow_up_questions 可视化为可点击选项
- 避免在 Dify 返回前同时弹出本地 demo 回复

### 城市目的地

- 16 个中国热门目的地卡片
- 城市卡片支持收藏
- 部分城市使用真实照片
- 城市详情抽屉
- 收藏城市进入 `Mi Viaje`

### 地图和路线

- 使用本地完整中国地图 SVG，避免外部 GeoJSON 不稳定
- 城市点正确标注
- 支持多选城市
- 按选择顺序生成城市之间交通段
- 前端内置交通时间和价格，不浪费模型 token
- 收藏城市次级高亮
- 注意中国地图完整性

### 行前准备中心

- 签证/免签判断入口
- Alipay / WeChat Pay 设置清单
- eSIM / VPN / 地图 / 翻译 App 清单
- 高铁购票、实名制、护照注意事项
- 打车、支付、交通、语言等具体准备模块
- 风险提示：节假日、预约、语言、支付失败、网络环境等
- 模块可点击展开，避免页面信息过大
- 各模块可触发 AI 追问

### Mi Viaje 个人旅行空间

- 顶部和悬浮入口
- 侧边抽屉体验
- 支持保存：
  - 收藏城市
  - 收藏景点
  - 路线
  - 行前准备 checklist
  - 用户偏好
  - 个人记忆文本
  - AI 识别出的记忆条目
- 支持手动新增景点
- 支持单项删除
- 支持分类清空
- 未登录时提示注册/登录以保存喜好和路线

### 账户系统

- Supabase Auth 注册/登录
- 密码明文切换
- 注册二次确认密码
- 登录不需要二次确认密码
- 登录后隐藏注册/登录入口
- 登录后顶部显示退出登录
- 退出登录前询问是否保存到账号
- Supabase 保存：
  - profile
  - saved_cities
  - saved_places
  - saved_routes
  - prep_progress
  - chat_memories
- Vercel Serverless API 代理 Supabase，避免 service role key 暴露到前端

### 部署和安全

- Vercel 部署
- Dify API Key 放在 Vercel 环境变量
- Supabase URL / anon key / service role key 放在 Vercel 环境变量
- 前端不暴露 Dify Key 和 Supabase service role key
- `/api/health` 用于检查环境变量配置状态

## 5. 技术架构

前端：

- 静态 HTML / CSS / JavaScript
- 核心文件：
  - `index.html`
  - `styles.css`
  - `app.js`
  - `assets/`

部署：

- Vercel
- 静态站 + Serverless API

AI：

- Dify Chatflow
- DeepSeek 模型
- Dify API 通过 `/api/chat.js` 代理调用

数据库和账户：

- Supabase Auth
- Supabase Postgres
- Serverless API：
  - `api/auth.js`
  - `api/account.js`
  - `api/health.js`

数据存储策略：

- localStorage 保证即时体验
- 登录后同步到 Supabase
- 退出前提醒保存

## 6. Dify Agent 设计思路

核心原则：

```text
Dify 负责理解、决策、结构化输出。
前端负责展示、保存、地图、PDF、账户和交互。
```

当前规划节点：

```text
Start
  -> 参数提取器
  -> 问题分类器
    -> planificar_ruta
    -> descubrir_ciudades
    -> guia_pagos
    -> guia_transporte
    -> entradas_reservas
    -> preparacion_china
    -> frases_chino
    -> generar_guia_completa
    -> pregunta_general
```

关键设计：

- 参数提取器提取天数、月份、兴趣、预算、城市、旅伴、入境/离境城市等
- 分类器判断意图
- 缺少关键信息时进入 `LLM_MissingInfo`
- 输出必须包含简短西语说明和 `<viajaachina_data>` 结构化 JSON
- 前端读取结构化 JSON，生成卡片、按钮、保存入口和后续追问

已知待优化：

- Dify 输出有时过于散文，需要继续强制结构化
- 部分知识库还没完全补齐
- 工具资源表和 App 下载链接需要继续标准化
- 未来需要图片/PDF 导出，而不是纯文本攻略

## 7. 产品经理能力体现

### 用户洞察

项目不是从技术开始，而是从境外游客来中国的真实摩擦点开始：

- 支付
- 交通
- 预约
- 语言
- 网络
- 证件
- 城市选择

### 需求拆解

把“生成旅行攻略”拆成多个产品模块：

- 需求收集
- 意图分类
- 城市推荐
- 路线规划
- 交通比较
- 行前准备
- 账户保存
- 记忆复用
- SEO 获客

### AI 产品设计

体现从“聊天机器人”到“任务型 Agent”的转化：

- Chatflow 节点设计
- 参数提取
- 意图分类
- 知识库/RAG
- 结构化输出
- 前端可视化渲染
- 用户记忆
- 安全策略

### 数据和闭环意识

第一版已经具备用户资产沉淀：

- 收藏城市
- 收藏景点
- 路线
- checklist
- 偏好
- 记忆

这为后续个性化推荐、留存和复访打基础。

### 商业和增长意识

已有 SEO 方向：

- viajar a China
- viaje a China
- itinerario China
- China en 10 dias
- Alipay China
- tren bala China
- visa China
- turismo China en español

产品可自然承接搜索流量，并通过免费工具降低使用门槛。

## 8. 简历表达建议

### 中文简历版本

项目名称：

```text
viajaachina：面向西语游客的中国旅行 AI Planner
```

项目描述：

```text
独立设计并搭建面向西班牙语游客的中国旅行 AI 规划网站，围绕境外游客来华旅行中的城市选择、路线规划、支付、交通、预约、签证和行前准备等高频痛点，使用 Dify Chatflow + DeepSeek + Supabase + Vercel 构建从对话需求收集到结构化攻略生成、收藏记忆和账户同步的完整产品闭环。
```

可写成果：

- 设计 Dify Chatflow，包含参数提取、意图分类、缺失信息追问、知识检索和结构化输出
- 搭建西语旅行规划前端，支持 16 个中国热门目的地、收藏、路线地图和行前准备中心
- 设计 `Mi Viaje` 个人旅行空间，沉淀城市、景点、路线、checklist、偏好和记忆
- 接入 Supabase Auth 和数据表，实现注册登录、用户资料保存和云端同步
- 通过 Vercel Serverless API 保护 Dify/Supabase key，避免前端泄露 token
- 完成 SEO 基础优化，围绕西语游客搜索词设计自然流量入口

### 英文/西文方向可用描述

```text
Designed and built viajaachina, an AI travel planner for Spanish-speaking travelers visiting China. The product combines Dify Chatflow, DeepSeek, Supabase and Vercel to transform conversational travel needs into structured itineraries, city recommendations, transport comparisons, preparation checklists and persistent user memory.
```

## 9. 面试讲述结构

可以按这个顺序讲：

1. 我为什么做这个项目
   - 目标是转 AI 产品经理，需要一个真实、完整、有业务场景的 AI 产品项目
   - 选择西语游客来中国，因为痛点具体、跨文化信息不对称明显

2. 用户痛点是什么
   - 不知道去哪
   - 不会支付
   - 不懂高铁和实名制
   - 不知道预约和签证
   - 普通大模型回答太长且不可执行

3. 产品怎么解决
   - Chatflow 收集需求
   - Agent 分类和提取参数
   - 地图/卡片/checklist 可视化
   - Mi Viaje 保存用户旅行资产
   - 账户同步形成长期记忆

4. AI 设计有什么不同
   - 不是让模型随便回答
   - 强制输出结构化 JSON
   - 前端把 JSON 渲染成卡片、路线、保存按钮
   - 模型负责决策，前端负责产品体验

5. 遇到的问题和取舍
   - 地图外部 GeoJSON 不稳定，改成本地完整中国 SVG
   - Dify 输出太长，改成结构化输出和前端可视化
   - 用户不想注册也能体验，所以 localStorage + 登录后同步
   - API Key 不能暴露，所以用 Vercel Serverless 代理

6. 下一步
   - 优化 Dify Prompt 和知识库
   - 做 PDF / 图片化攻略导出
   - 增加真实工具资源表和下载链接
   - 增加用户行为数据和转化分析

## 10. 下一阶段优先级

P0：

- 继续优化 Dify Prompt，稳定结构化输出
- 完成工具资源表：Alipay、WeChat、Trip.com、12306、Amap、Baidu Maps、Didi、翻译、eSIM、VPN 等
- 让 `follow_up_questions` 全部变成可点击选项
- 完善知识库缺失内容

P1：

- PDF / 图片化攻略导出
- 更细的城市详情和景点数据
- 隐私政策、服务条款独立页面
- Google Search Console / Vercel Analytics
- 用户行为事件埋点

P2：

- 多语言扩展：英语、葡语
- 更多出发国家的签证判断
- 更完整的预算估算
- 景点实时订票链接
- 真实地图 API 或更精细地图交互

## 11. 当前需要记住的事项

- `static-site` 是部署同步目录，修改主文件后要同步：
  - `index.html`
  - `app.js`
  - `styles.css`
- Dify API Key 不要写入前端代码
- Supabase service role key 不要写入前端代码
- 地图优先使用本地完整中国地图，避免回到外部不稳定接口
- 用户非常重视移动端体验，手机首屏要能看到输入框和按钮
- 项目核心目标是 AI 产品经理求职，不只是技术 demo

## 12. 给 GPT 回顾项目的 Prompt

复制下面这段给 GPT，并附上本文件和项目关键文档：

```text
你是一名资深 AI 产品经理面试官和作品集顾问。

我正在准备转型 AI 产品经理。请你基于我提供的 viajaachina 项目文档，帮我完成以下任务：

1. 从 AI 产品经理求职角度，评估这个项目的亮点、短板和可包装点。
2. 帮我提炼 3 个不同版本的项目介绍：
   - 简历一句话版本
   - 简历项目经历版本
   - 面试 2 分钟讲述版本
3. 帮我识别这个项目中最能体现 AI 产品能力的部分，包括：
   - 用户痛点洞察
   - Agent / Chatflow 设计
   - 结构化输出设计
   - RAG / 知识库设计
   - 用户记忆和账户体系
   - 安全和 token 保护
   - SEO 和增长意识
4. 帮我把项目经验改写成 STAR 法则：
   - Situation
   - Task
   - Action
   - Result
5. 帮我列出面试官可能追问的 15 个问题，并给出高质量回答。
6. 帮我指出项目下一步最值得补的功能，让它更像真实 AI 产品，而不是 demo。
7. 输出内容要适合 AI 产品经理求职，不要只从工程角度评价。

项目背景：
viajaachina 是一个面向西班牙语游客的中国旅行 AI Planner，通过 Dify Chatflow + DeepSeek + Supabase + Vercel，把用户的旅行需求转化为城市推荐、路线地图、交通建议、支付准备、景点预约、行前 checklist、个人收藏和记忆。

请用中文输出，必要时给出可直接复制到简历里的中文和英文表达。
```

## 13. 推荐一起交给 GPT 的文件

建议一起提供：

```text
AI_PM_PROJECT_REVIEW.md
HANDOFF.md
DIFY_BUILD_PLAYBOOK.md
DIFY_FINAL_SOLUTION.md
SUPABASE_SETUP.md
```

如果 GPT 只允许上传一个文件，优先上传：

```text
AI_PM_PROJECT_REVIEW.md
```
