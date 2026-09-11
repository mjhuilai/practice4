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

// ===== 第二步：清洗 → 计算（每个函数只做一件事）=====

// 清洗：只保留类别为非空字符串、金额为非负有限数字的合法记录（filter）
const cleanExpenses = (list) => list.filter((record) =>
  typeof record.category === 'string'
  && record.category.trim() !== ''
  && typeof record.amount === 'number'
  && Number.isFinite(record.amount)
  && record.amount >= 0
);

// 计算总支出：对金额累加（reduce）
const calcTotal = (list) => list.reduce((sum, record) => sum + record.amount, 0);

// 按类别汇总支出：聚合成 { 类别: 金额 } 对象（reduce）
const sumByCategory = (list) => list.reduce((result, record) => {
  const previous = result[record.category] ?? 0; // 该类别首次出现时从 0 起算
  result[record.category] = previous + record.amount;
  return result;
}, {});

// 筛选超过指定阈值的大额消费（filter）
const findOverBudget = (list, limit) => list.filter((record) => record.amount > limit);

// 把记录映射成一行可读文本（map）
const toLines = (list) => list.map((record) =>
  `${record.date} ${record.category}《${record.item}》：${record.amount.toFixed(2)} 元`
);

// 中间结果先打印确认，再进入下一步组装
const validExpenses = cleanExpenses(rawExpenses);
console.log('清洗后记录：', validExpenses);
console.log('总支出：', calcTotal(validExpenses).toFixed(2), '元');
console.log('分类汇总：', sumByCategory(validExpenses));
console.log('大额消费（>30 元）：', findOverBudget(validExpenses, 30));
console.log('消费明细行：', toLines(validExpenses));
