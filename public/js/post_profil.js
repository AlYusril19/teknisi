'use strict';

// Ambil variabel global dari Blade
const apiBaseUrl = window.config.apiBaseUrl;
const apiToken = window.config.apiToken;

document.addEventListener('DOMContentLoaded', function () {
  // Elemen-elemen penting
  const accountUserImage = document.getElementById('uploadedAvatar');
  const fileInput = document.querySelector('.account-file-input');
  const resetFileInput = document.querySelector('.account-image-reset');
  const cropContainer = document.getElementById('cropContainer');
  const cropModal = document.getElementById('cropModal');
  const cropSaveBtn = document.getElementById('cropSaveBtn');
  const cropCancelBtn = document.getElementById('cropCancelBtn');

  let croppieInstance = null;
  const resetImage = accountUserImage.src;

  // Fungsi untuk membuka modal crop dan initialize Croppie
  function openCropper(imageUrl) {
    if (croppieInstance) {
      croppieInstance.destroy();
    }

    cropModal.style.display = 'block'; // Tampilkan modal crop

    croppieInstance = new Croppie(cropContainer, {
      viewport: { width: 200, height: 200, type: 'circle' }, // Crop lingkaran 1:1
      boundary: { width: 300, height: 300 },
      showZoomer: true,
      enableOrientation: true,
      enforceBoundary: true,
      url: imageUrl
    });
  }

  // Event saat file dipilih
  fileInput.onchange = () => {
    if (fileInput.files[0]) {
      const file = fileInput.files[0];
      const tempImageUrl = window.URL.createObjectURL(file);
      openCropper(tempImageUrl);
    }
  };

  // Tombol simpan crop dan upload
  cropSaveBtn.onclick = () => {
  if (!croppieInstance) return;

  croppieInstance.result({
      type: 'blob',
      size: { width: 400, height: 400 }, // Ukuran output crop persegi 400x400 px
      format: 'png',
      quality: 1.0,
      circle: false, // <-- Ganti dari true menjadi false agar hasil crop persegi (bukan lingkaran)
  }).then(blob => {
      const newImageUrl = URL.createObjectURL(blob);
      accountUserImage.src = newImageUrl;
      cropModal.style.display = 'none';

      // Upload file hasil crop
      let formData = new FormData();
      formData.append('photo', blob, 'cropped.png');
      formData.append('_method', 'PUT');

      $.ajax({
      url: apiBaseUrl + '/api/user/profile-update',
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + apiToken },
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
          alert(response.message);
          if (response.photo_url) {
          let newPhotoUrl = response.photo_url + '?t=' + new Date().getTime();
          setTimeout(() => { location.reload(); }, 300);
          }
      },
      error: function (xhr) {
          alert('Gagal mengunggah foto: ' + xhr.responseText);
          accountUserImage.src = resetImage;
          fileInput.value = '';
      }
      });
  });
  };

  // Tombol batal crop
  cropCancelBtn.onclick = () => {
  cropModal.style.display = 'none';
  fileInput.value = '';
  };

  // Reset file input dan gambar asli
  resetFileInput.onclick = () => {
  fileInput.value = '';
  accountUserImage.src = resetImage;
  };
});
