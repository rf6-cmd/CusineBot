document.querySelectorAll('.interactive').forEach(box => {
  if (box.dataset.selectable === 'false') return;

  const name = box.dataset.name;

  if (localStorage.getItem(name) === 'selected') {
    box.classList.add('selected');
  }

  box.addEventListener('click', () => {
    box.classList.toggle('selected');
    if (box.classList.contains('selected')) {
      localStorage.setItem(name, 'selected');
    } else {
      localStorage.removeItem(name);
    }
  });
});


