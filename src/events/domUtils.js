import $ from "jquery";

export function setupDataParent() {
  $(".parent > ul > li.child").each(function () {
    const parentId = $(this).closest(".parent").attr("id");
    $(this).attr("data-parent", parentId);
  });
}
