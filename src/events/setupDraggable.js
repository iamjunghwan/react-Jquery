import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";

export function setupDraggable() {
  $(".parent > ul > li.child").draggable({
    helper: "clone",
    revert: "invalid",
  });
}

export function applyDraggableToNewItem($li) {
  $li.draggable({
    helper: "clone",
    revert: "invalid",
  });
}
