import $ from "jquery";
import { applyDraggableToNewItem } from "./setupDraggable";

export function bindAddChildHandlers() {
  $(".add-child")
    .off("click")
    .on("click", function () {
      const parentId = $(this).data("parent");
      const $form = $(`
        <li class="add-form">
          <input type="text" placeholder="모델 이름 입력" />
          <button class="confirm-add">추가</button>
          <button class="cancel-add">취소</button>
        </li>
      `);
      $(this).replaceWith($form);

      $form.find(".confirm-add").on("click", function () {
        const modelName = $form.find("input").val().trim();
        if (!modelName) return alert("모델 이름을 입력하세요.");

        const $newLi = $(`
          <li class="child" data-parent="${parentId}" style="display: flex; justify-content: space-between; gap: 2px">
            <span> ${modelName} </span>
            <div class="actions">
              <button>★</button>
              <button>✎</button>
              <button>🗑️</button>
            </div>
          </li>
        `);

        $form.before($newLi);
        applyDraggableToNewItem($newLi);
        $form.replaceWith(
          `<li class="add-child" data-parent="${parentId}">➕ 클릭하여 모델 추가</li>`
        );
        bindAddChildHandlers();
      });

      $form.find(".cancel-add").on("click", function () {
        $form.replaceWith(
          `<li class="add-child" data-parent="${parentId}">➕ 클릭하여 모델 추가</li>`
        );
        bindAddChildHandlers();
      });
    });
}
