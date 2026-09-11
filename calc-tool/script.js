// script.js —— 消费记账小工具
// 场景：统计一段日期内的日常消费，过滤非法记录、汇总总支出与分类支出、找出大额消费
// 数据处理流程：原始数据 → 清洗 → 计算 → 格式化输出（每个箭头对应一个职责单一的函数）

// ===== 第一步：原始数据（数组 + 对象组织；故意混入非法数据以检验清洗逻辑）=====
const rawExpenses = [
  { category: '餐饮', item: '午餐',   amount: 25.5,  date: '2026-09-01' },
  { category: '交通', item: '地铁',   amount: 6,     date: '2026-09-01' },
  { category: '餐饮', item: '晚餐',   amount: 38,    date: '2026-09-02' },
  { category: '购物', item: '笔记本', amount: 15.9,  date: '2026-09-02' },
  { category: '娱乐', item: '电影票', amount: 45,    date: '2026-09-03' },
  { category: '餐饮', item: '奶茶',   amount: -12,   date: '2026-09-03' }, // 非法：负金额
  { category: '交通', item: '打车',   amount: 'abc', date: '2026-09-04' }, // 非法：金额非数字
  { category: '',     item: '未知',   amount: 20,    date: '2026-09-04' }, // 非法：类别为空
  { category: '学习', item: '书籍',   amount: 68,    date: '2026-09-05' },
  { category: '餐饮', item: '早餐',   amount: 12.5,  date: '2026-09-05' }
];

console.table(rawExpenses);
