/** Shared fake-form validator: required fields, email format, checkbox checked. */
export function validateForm(form: HTMLFormElement): boolean {
  let ok = true;
  let focused = false;
  const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[required]"));

  for (const field of fields) {
    const group = field.closest<HTMLElement>(".fgroup") ?? field.closest<HTMLElement>(".checkline");
    let bad = !field.value.trim();
    if (field instanceof HTMLInputElement && field.type === "email" && field.value.trim()) {
      bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
    }
    if (field instanceof HTMLInputElement && field.type === "checkbox") {
      bad = !field.checked;
    }
    group?.classList.toggle("err", bad);
    if (bad) {
      ok = false;
      if (!focused) {
        field.focus();
        focused = true;
      }
    }
  }
  return ok;
}
