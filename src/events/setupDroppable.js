import $ from "jquery";

import "jquery-ui/ui/widgets/droppable";

export function setupDroppable() {
  $(".parent > ul").each(function () {
    const parentId = $(this).closest(".parent").attr("id");
    $(this).droppable({
      accept: `.child[data-parent='${parentId}']`,
      drop: function (event, ui) {
        const $droppedItem = ui.draggable;
        const $ul = $(this);
        $ul.append($droppedItem.css({ top: 0, left: 0 }));
        $droppedItem.attr("data-parent", parentId);
        $ul.append($ul.find(".add-child"));
      },
    });
  });
}
