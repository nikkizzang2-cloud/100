import { firebaseConfig } from "./firebase-config.js";

/* =========================================================
 * 편지 내용
 * - 한 블록 = 한 문장. 화면(초록 단어 말고 아무 곳)을 누르면 다음 문장이 나옴.
 * - states: [단어] 를 누를 때마다 그 문장이 다음 상태로 바뀜.
 *   지나간 문장이어도 초록 단어를 누르면 언제든 바뀜.
 * - 마지막 상태까지 누르면 [단어] 는 검정 글자가 됨.
 * - {{img:경로}} 는 그 자리에 사진.
 * - 문장은 줄바꿈 없이 이어짐. breakAfter: true 이면 그 문장 뒤에서 줄바꿈.
 * ========================================================= */
const LETTER = [
  { breakAfter: true, states: [
    "[민결이에게]",
    "[사랑하는] 민결이에게",
    "세상에서 쩨일~ 사랑하는 민결이에게",
  ] },

  { states: ["100일이네 쟈기야!"] },
  { states: [
    "저번 학기 아침에 일어났을 때 자기한테서 온 디엠에 입꼬리가 [올라간게] 얼마 전 같은데..",
    "저번 학기 아침에 일어났을 때 자기한테서 온 디엠에 입꼬리가 씨익ㅋ 올라간게 얼마 전 같은데..",
  ] },
  { states: [
    "우리 [찐한 사이]가 되었네.",
    "우리 여러모로ㅎ [찐한 사이]가 되었네.",
  ] },

  { states: [
    "자기랑 [폰연애?]",
    "자기랑 폰연애?(막 이래) 해서 소중한 가을을 같이 못 보냈지만",
  ] },

  { states: [
    "어쩌다 보니 오히려 하루에 3시간씩 전화하면서 자기랑 [더] 가까운 사이가 된 거 같아서 좋아.",
    "어쩌다 보니 오히려 하루에 3시간씩 전화하면서 자기랑 더[더] 가까운 사이가 된 거 같아서 좋아.",
    "어쩌다 보니 오히려 하루에 3시간씩 전화하면서 자기랑 더더더 가까운 사이가 된 거 같아서 좋아.",
  ] },
  { states: ["전화로도 할 얘기 많은 게 젤 재밌는 사이인 거잖아?"] },

  { states: ["그리고,"] },
  { states: ["{{img:assets/photo.png|익숙함에 속아 소중함을 잃지말 것}}"] },
  { states: ["뭔말알."] },

  { states: [
    "자기 돌아오면 소중함을 잊지 않고 있을 때 잘하자 감성으로 [재밌게] 놀 수 있을 거 같아.",
    "자기 돌아오면 소중함을 잊지 않고 있을 때 잘하자 감성으로 [실내에서ㅎ] 재밌게 놀 수 있을 거 같아.",
    "자기 돌아오면 소중함을 잊지 않고 있을 때 잘하자 감성으로 실내에서ㅎ 다양하게 ㅎ 재밌게 놀 수 있을 거 같아.",
  ] },

  { states: [
    "자기가 멀리 있어두 [연락도 잘해주구~]",
    "자기가 멀리 있어두 연락도 잘해주구~ [셋로그도 올려주구]",
    "자기가 멀리 있어두 연락도 잘해주구~ 섹시샤워하는 [셋로그도 올려주구]",
    "자기가 멀리 있어두 연락도 잘해주구~ 섹시샤워하는 셋로그도 올려주구~ [달콤하게 말해주구~]",
    "아무튼 자기가 멀리 있어두 연락도 잘해주구~ 섹시샤워하는 셋로그도 올려주구 달콤하게 말해주구~ 화장실두 자주 가주구ㅎ",
  ] },
  { states: ["그래서 멀리 있어도~ 같이 있는 것만 같아~~"] },

  { states: ["암튼 같이 있는 거처럼 나름의 추억이 생긴 거 같아."] },

  { states: [
    "이제 여행 어디 가봤어요? 하면 미국도 [가봤어요.]ㅎ 라고 해도 되나? 큭ㅋ",
    "이제 여행 어디 가봤어요? 하면 미국도 가봤어요. 거의ㅎ 라고 해도 되나? 큭ㅋ",
  ] },

  { states: ["내가 맨날 힘들다구 해서 조금 쳐지구 피곤했을 수도 있는데 위로해주구 내 편 들어주구 무지성 지지해줘서 고마워."] },

  { states: ["자기랑 저나하구 얘기하는 재미로 전시 준비 잘한 거 같아."] },
  { states: [
    "자기가 머 먹는지 [뭐 사는지] 뭐 듣는지~ 이런 거 듣는 것두 은근한 재미.",
    "자기가 머 먹는지 [라몬즈는 샀는지] 뭐 듣는지~ 이런 거 듣는 것두 은근한 재미.",
    "자기가 머 먹는지 [이번 라몬즈는 정품인지] 뭐 듣는지~ 이런 거 듣는 것두 은근한 재미.",
    "자기가 머 먹는지 [라몬즈 무사히 도착했는지] 뭐 듣는지~ 이런 거 듣는 것두 은근한 재미.",
    "자기가 머 먹는지 [라몬즈 착화감 편한지] 뭐 듣는지~ 이런 거 듣는 것두 은근한 재미.",
    "자기가 머 먹는지 [라몬즈 착색은 지워졌는지] 뭐 듣는지~ 이런 거 듣는 것두 은근한 재미.",
  ] },
  { states: ["동숲 주민 같기도 하구 ㅋ."] },
  { states: ["옷 뭐 살지 같이 골라주는 것도 쏠쏠한 재미."] },
  { states: [
    "나에게 [최초 공개] 해줘야 해.",
    "나에게 항시 최초 공개 해줘야 해.",
  ] },

  { states: ["자기야 이제 곧 오니까 다시.. 우리 첨 만난 거처럼 예뿌게 만나자."] },
  { states: [".. 무려.. 썸 2배 이벤트.."] },

  { states: ["나는 이제 디데이 세면서 조신하게 자기를"] },
  { states: [
    "[기다릴게..]",
    "[기다릴게..]{{img:assets/bow.png|큰절}}",
  ] },

  { states: ["자기 사랑해"] },
  { states: ["뽑뽀.."] },
  { states: ["뽀뽀.."] },
];

/* ---------- 상태 ---------- */
let shown = 1;                              // 화면에 나온 문장 수
let steps = LETTER.map(() => 0);            // 문장마다 몇 번째 상태인지

const $ = (id) => document.getElementById(id);
const letterEl = $("letter");
const scrollEl = $("letterScroll");

const lastStep = (b) => LETTER[b].states.length - 1;

function renderText(container, text, b, clickable) {
  // "안녕 [민결]" → 텍스트 + 초록 단어 버튼, "{{img:경로|설명}}" → 사진
  const parts = text.split(/(\[[^\]]+\]|\{\{img:[^}]+\}\})/);
  for (const part of parts) {
    if (!part) continue;
    const word = part.match(/^\[([^\]]+)\]$/);
    const img = part.match(/^\{\{img:([^|}]+)(?:\|([^}]*))?\}\}$/);
    if (word && !clickable) {
      // 끝까지 눌러서 더 바뀔 게 없으면 검정 글자로
      container.append(document.createTextNode(word[1].trim()));
    } else if (word) {
      const el = document.createElement("button");
      el.className = "word";
      el.type = "button";
      el.dataset.block = String(b);
      el.textContent = word[1].trim();
      container.append(el);
    } else if (img) {
      const el = document.createElement("img");
      el.src = img[1];
      el.alt = img[2] || "";
      el.className = "photo";
      container.append(el);
    } else {
      container.append(document.createTextNode(part));
    }
  }
}

function render({ scroll = false } = {}) {
  letterEl.replaceChildren();
  for (let b = 0; b < shown; b++) {
    const span = document.createElement("span");
    span.className = "line";
    renderText(span, LETTER[b].states[steps[b]], b, steps[b] < lastStep(b));

    // 앞 문장 뒤에 띄어쓰기 한 칸 (줄바꿈/사진 뒤는 제외)
    const prev = letterEl.lastChild;
    const prevEndsBlock = !prev || prev.nodeName === "BR" || prev.lastChild?.nodeName === "IMG";
    if (!prevEndsBlock) letterEl.append(" ");
    letterEl.append(span);
    if (LETTER[b].breakAfter && b < shown - 1) letterEl.append(document.createElement("br"));
  }

  if (scroll) {
    requestAnimationFrame(() => {
      scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: "smooth" });
    });
  }
}

// 초록 단어: 그 문장만 다음 상태로
function expand(b) {
  if (steps[b] >= lastStep(b)) return;
  steps[b]++;
  render({ scroll: b === shown - 1 && LETTER[b].states[steps[b]].includes("{{img:") });
  // 키보드로 눌렀다면 같은 문장의 다음 초록 단어로 포커스
  if (document.activeElement === document.body) {
    letterEl.querySelector(`[data-block="${b}"]`)?.focus({ preventScroll: true });
  }
}

// 화면 클릭: 다음 문장
function next() {
  if (shown >= LETTER.length) return;
  shown++;
  render({ scroll: true });
}

function reset() {
  shown = 1;
  steps = LETTER.map(() => 0);
  render({ scroll: true });
}

/* ---------- 클릭 규칙 ---------- */
$("letterPane").addEventListener("click", (e) => {
  if (e.target.closest(".bar")) return;               // 하단 버튼 영역은 제외
  if (window.getSelection()?.toString()) return;      // 글자 드래그 중이면 무시

  const word = e.target.closest("[data-block]");
  if (word) expand(Number(word.dataset.block));        // 초록 단어 → 단어 추가
  else next();                                         // 그 외 → 다음 문장
});

// 키보드: 스페이스/엔터/→ 로 다음 문장 (초록 단어에 포커스가 있으면 그 단어를 누름)
document.addEventListener("keydown", (e) => {
  if (e.target.closest?.("textarea, button")) return;
  if (!["Enter", " ", "ArrowRight"].includes(e.key)) return;
  next();
  e.preventDefault();
});

/* =========================================================
 * 답장 저장소: Firebase가 설정되어 있으면 공유 저장, 아니면 이 브라우저에 저장
 * ========================================================= */
const LOCAL_KEY = "minkyul-100-reply";

async function createStore() {
  if (!firebaseConfig.apiKey) {
    console.info("[letter] Firebase 설정이 없어 답장을 이 브라우저에만 저장합니다.");
    return {
      shared: false,
      async load() { try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? null; } catch { return null; } },
      async save(text) {
        const data = { text, updatedAt: Date.now() };
        localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
        return data;
      },
    };
  }
  const base = "https://www.gstatic.com/firebasejs/10.12.2";
  const { initializeApp } = await import(`${base}/firebase-app.js`);
  const { getFirestore, doc, getDoc, setDoc } = await import(`${base}/firebase-firestore.js`);
  const db = getFirestore(initializeApp(firebaseConfig));
  const ref = doc(db, "letter", "reply");
  return {
    shared: true,
    async load() {
      const snap = await getDoc(ref);
      return snap.exists() ? snap.data() : null;
    },
    async save(text) {
      const data = { text, updatedAt: Date.now() };
      await setDoc(ref, data);
      return data;
    },
  };
}

const storePromise = createStore();

const app = $("app");
const replyPane = $("replyPane");
const replyText = $("replyText");
const printReply = $("printReply");
const saveBtn = $("saveBtn");
const statusEl = $("saveStatus");

const fmt = (ms) => new Date(ms).toLocaleString("ko-KR", {
  month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
});
const setStatus = (msg) => { statusEl.textContent = msg; };
replyText.addEventListener("input", () => { printReply.textContent = replyText.value; });

async function openReply() {
  app.classList.add("split");
  replyPane.hidden = false;
  replyText.focus();
  try {
    const store = await storePromise;
    const saved = await store.load();
    if (saved?.text && !replyText.value) {
      replyText.value = saved.text;
      printReply.textContent = saved.text;
      setStatus(`${fmt(saved.updatedAt)}에 저장된 답장`);
    }
  } catch (err) {
    console.error(err);
    setStatus("저장된 답장을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.");
  }
}

function closeReply() {
  app.classList.remove("split");
  replyPane.hidden = true;
}

async function saveReply() {
  const text = replyText.value.trim();
  if (!text) { setStatus("답장을 먼저 써주세요."); replyText.focus(); return; }
  saveBtn.disabled = true;
  setStatus("저장 중…");
  try {
    const store = await storePromise;
    const saved = await store.save(text);
    setStatus(`${fmt(saved.updatedAt)} 저장 완료${store.shared ? "" : " (이 브라우저에만)"}`);
  } catch (err) {
    console.error(err);
    setStatus("저장하지 못했어요. 인터넷 연결을 확인하고 다시 눌러 주세요.");
  } finally {
    saveBtn.disabled = false;
  }
}

$("replyBtn").addEventListener("click", openReply);
$("closeBtn").addEventListener("click", closeReply);
$("saveBtn").addEventListener("click", saveReply);
$("resetBtn").addEventListener("click", reset);
$("printBtn").addEventListener("click", () => window.print());

render();
