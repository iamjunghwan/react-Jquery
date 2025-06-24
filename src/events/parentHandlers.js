import $ from "jquery";
import { bindCommonHandlers } from "./handlers";
import { bindAddChildHandlers } from "./modelHandlers";

export function bindParentHandlers() {
  $(".add-parent-button")
    .off("click")
    .on("click", function () {
      const $wrapper = $(this).parent();

      const $form = $(`
          <div class="add-parent-form">
            <input type="text" class="new-parent-name" placeholder="제조사를 입력하세요" />
            <button class="confirm-add-parent">추가</button>
            <button class="cancel-add-parent">취소</button>
          </div>
        `);

      $(this).replaceWith($form);

      $form.find(".confirm-add-parent").on("click", function () {
        const name = $form.find(".new-parent-name").val().trim();
        if (!name) return alert("제조사 이름을 입력하세요.");
        const newId = `parent-${Date.now()}`;

        const $newParent = $(`
            <div style="display: flex; justify-content: space-between; gap: 2px">
              <div class="parent" id="${newId}">
                <strong class="parent-header">${name}</strong>
                <ul class="child-list">
                  <li class="add-child" data-parent="${newId}">➕ 클릭하여 모델 추가</li>
                </ul>
              </div>
              <div>
                <button>★</button>
                <button>✎</button>
                <button>🗑️</button>
              </div>
            </div>
          `);

        $wrapper.before($newParent);
        $form.replaceWith(
          `<div class="add-parent-button">➕ 클릭하여 제조사 추가</div>`
        );
        bindParentHandlers(); // 동적으로 제조사 추가시 input,button 생성
        bindCommonHandlers(); // 추가된 제조사 클릭시 자식 li 보여주기
        bindAddChildHandlers(); // 추가된 제조사의 새로운 모델 추가 관련 이벤트
      });

      $form.find(".cancel-add-parent").on("click", function () {
        $form.replaceWith(
          `<div class="add-parent-button">➕ 클릭하여 제조사 추가</div>`
        );
        bindParentHandlers();
      });
    });
}
