import { setupDataParent } from "./domUtils";
import { setupDraggable } from "./setupDraggable";
import { setupDroppable } from "./setupDroppable";
import { bindAddChildHandlers } from "./modelHandlers";
import { bindParentHandlers } from "./parentHandlers";
import { bindCommonHandlers } from "./handlers";

export function initializeEvents() {
  setupDataParent();
  setupDroppable();
  setupDraggable();
  bindAddChildHandlers();
  bindParentHandlers();
  bindCommonHandlers(); // toggle, 버튼 이벤트 등
}
