const REPORTS = [
  { title: '2026 Q1 Seoul Office Snapshot', category: 'office', source: 'cbre', date: '2026-04-20', summary: '서울 주요 권역 공실률과 임대료 흐름 요약.', url: 'https://www.cbrekorea.com/insights#보고서' },
  { title: '물류센터 임대차 시장 점검', category: 'logistics', source: 'genstar', date: '2026-04-11', summary: '수도권 물류 거점의 공급/수요 밸런스 분석.', url: 'https://blog.genstarmate.com/category/research/' },
  { title: 'Retail Market Beat Korea', category: 'retail', source: 'cw', date: '2026-03-27', summary: '핵심 상권 유동인구와 임차 수요 변화.', url: 'https://www.cushmanwakefield.com/ko-kr/south-korea/insights' },
  { title: 'Hotel Investment Outlook 2026', category: 'hotel', source: 'savills', date: '2026-03-14', summary: '거래 사례 기반 호텔 투자수익률 시사점.', url: 'https://www.savills.co.kr/insight-and-opinion/research.aspx?rc=Korea&p=&t=&f=date&q=&page=1' },
  { title: 'Korea CRE Annual Outlook', category: 'market', source: 'cbre', date: '2026-01-15', summary: '금리/자금조달/캡레이트 중심 연간 전망.', url: 'https://www.cbrekorea.com/insights#보고서' }
];

const labels = {
  office: '오피스', logistics: '물류', retail: '리테일', hotel: '호텔', market: '시장전망/투자의견',
  genstar: '젠스타메이트', cbre: 'CBRE', cw: 'C&W', savills: 'Savills'
};

const categoryEl = document.querySelector('#category');
const sourceEl = document.querySelector('#source');
const keywordEl = document.querySelector('#keyword');
const cardsEl = document.querySelector('#cards');
const countEl = document.querySelector('#count');

function render() {
  const category = categoryEl.value;
  const source = sourceEl.value;
  const keyword = keywordEl.value.toLowerCase().trim();

  const filtered = REPORTS.filter((item) => {
    if (category !== 'all' && item.category !== category) return false;
    if (source !== 'all' && item.source !== source) return false;
    if (keyword && !(`${item.title} ${item.summary}`.toLowerCase().includes(keyword))) return false;
    return true;
  }).sort((a, b) => b.date.localeCompare(a.date));

  cardsEl.innerHTML = '';
  const tmpl = document.querySelector('#cardTemplate');

  filtered.forEach((item) => {
    const node = tmpl.content.firstElementChild.cloneNode(true);
    node.querySelector('.category').textContent = labels[item.category];
    node.querySelector('.date').textContent = item.date;
    node.querySelector('.title').textContent = item.title;
    node.querySelector('.summary').textContent = item.summary;
    const tags = node.querySelector('.tags');
    ['source:' + labels[item.source], 'cat:' + labels[item.category]].forEach((t) => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      tags.appendChild(span);
    });
    const link = node.querySelector('.link');
    link.href = item.url;
    cardsEl.appendChild(node);
  });

  countEl.textContent = `총 ${filtered.length}건`;
}

[categoryEl, sourceEl, keywordEl].forEach((el) => el.addEventListener('input', render));
document.querySelector('#resetBtn').addEventListener('click', () => {
  categoryEl.value = 'all';
  sourceEl.value = 'all';
  keywordEl.value = '';
  render();
});
document.querySelector('#refreshBtn').addEventListener('click', () => {
  alert('시뮬레이션: 실제 서비스에서는 각 사이트를 수집해 신규 리포트를 업데이트합니다.');
});

render();
