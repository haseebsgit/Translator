const API_ROOT = 'https://fakestoreapi.com/products';

function showLoading(show) {
  if (show) $('#loadingOverlay').fadeIn(120);
  else $('#loadingOverlay').fadeOut(120);
}

function showToast(msg, err) {
  const id = 't' + Date.now();
  const html = `<div id="${id}" class="toast align-items-center text-bg-${err ? 'danger' : 'success'} border-0 mb-2"><div class="d-flex"><div class="toast-body">${msg}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div>`;
  $('#toastContainer').append(html);
  const toastEl = new bootstrap.Toast(document.getElementById(id), { delay: 3000 });
  toastEl.show();
  document.getElementById(id).addEventListener('hidden.bs.toast', function () {
    $(this).remove();
  });
}

function renderProductRow(p) {
  return `<tr data-id="${p.id}">
    <td>${p.id}</td>
    <td><img src="${p.image}" class="product-img" alt=""></td>
    <td>${$('<div>').text(p.title).html()}</td>
    <td>${p.price.toFixed(2)}</td>
    <td>
      <button class="btn btn-sm btn-outline-secondary btn-edit me-2">Edit</button>
      <button class="btn btn-sm btn-outline-danger btn-delete">Delete</button>
    </td>
  </tr>`;
}

function loadProducts() {
  $('#productsTable tbody').empty();
  $('#spinnerRow').show();
  $.get(API_ROOT, function (data) {
    $('#spinnerRow').hide();
    data.slice(0, 10).forEach(p => $('#productsTable tbody').append(renderProductRow(p)));
  }).fail(() => {
    $('#spinnerRow').hide();
    showToast('Failed to load products', true);
  });
}

function createProduct(payload, cb) {
  showLoading(true);
  $.ajax({ url: API_ROOT, method: 'POST', data: JSON.stringify(payload), contentType: 'application/json' })
    .done(p => { $('#productsTable tbody').prepend(renderProductRow(p)); showToast('Product added'); cb && cb(); })
    .fail(() => showToast('Failed to add product', true))
    .always(() => showLoading(false));
}

function updateProduct(id, payload, cb) {
  showLoading(true);
  $.ajax({ url: API_ROOT + '/' + id, method: 'PUT', data: JSON.stringify(payload), contentType: 'application/json' })
    .done(p => { const row = $(`#productsTable tr[data-id='${id}']`); row.replaceWith(renderProductRow(p)); showToast('Product updated'); cb && cb(); })
    .fail(() => showToast('Failed to update product', true))
    .always(() => showLoading(false));
}

function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  showLoading(true);
  $.ajax({ url: API_ROOT + '/' + id, method: 'DELETE' })
    .done(() => { $(`#productsTable tr[data-id='${id}']`).remove(); showToast('Product removed'); })
    .fail(() => showToast('Failed to delete product', true))
    .always(() => showLoading(false));
}

$(function () {
  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  loadProducts();

  $('#btnNew').click(() => {
    $('#modalTitle').text('New Product');
    $('#productId').val('');
    $('#productTitle').val('');
    $('#productPrice').val('');
    $('#productImage').val('');
    modal.show();
  });

  $('#productForm').submit(function (e) {
    e.preventDefault();
    const id = $('#productId').val();
    const payload = {
      title: $('#productTitle').val().trim(),
      price: parseFloat($('#productPrice').val()),
      image: $('#productImage').val().trim(),
      description: 'Simple product',
      category: 'general'
    };
    if (!payload.title || !payload.price || !payload.image) { showToast('Please fill all fields', true); return; }
    if (id) updateProduct(id, payload, () => modal.hide()); else createProduct(payload, () => modal.hide());
  });

  $('#productsTable').on('click', '.btn-edit', function () {
    const tr = $(this).closest('tr');
    $('#modalTitle').text('Edit Product');
    $('#productId').val(tr.data('id'));
    $('#productTitle').val(tr.find('td').eq(2).text());
    $('#productPrice').val(tr.find('td').eq(3).text());
    $('#productImage').val(tr.find('img').attr('src'));
    modal.show();
  });

  $('#productsTable').on('click', '.btn-delete', function () {
    const id = $(this).closest('tr').data('id');
    deleteProduct(id);
  });
});