import { setupDataParent } from "./domUtils";
import { setupSortable } from "./setupSortable";
import { setupDraggable } from "./setupDraggable";
import { bindAddChildHandlers } from "./modelHandlers";
import { bindParentHandlers } from "./parentHandlers";
import { bindCommonHandlers } from "./handlers";
import { setInitBaseEvents } from "./setInitBaseEvents";

export function initializeEvents() {
  setupDataParent();
  bindCommonHandlers(); // 제조사 클릭시 자식 요소 보이게 슬라이딩
  setupDraggable(); // 한 부모 안에서만 li 드롭 가능하게
  setupSortable(); // li요소 드래그 가능하게
  bindParentHandlers(); // 제조사 추가시

  bindAddChildHandlers(); // 모델 추가 관련 핸들러
  setInitBaseEvents(); // 모델 텍스트 더블 클릭 및 수정 버튼 클릭시 이벤트들
}
