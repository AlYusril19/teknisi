<script src="{{ asset('sneat') }}/assets/js/dashboards-analytics.js"></script>
{{-- alert setTimeout --}}
<script>
  window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove(); 
    });
  }, 3500);
</script>
{{-- format rupiah --}}
<script>
  function formatRupiahJS(angka) {
      var reverse = angka.toString().split('').reverse().join('');
      var ribuan = reverse.match(/\d{1,3}/g);
      ribuan = ribuan.join('.').split('').reverse().join('');
      return 'Rp ' + ribuan;
  }
</script>
{{-- cache url api --}}
<script>
  window.config = {
    apiBaseUrl: "{{ config('api.base_url') }}",
    apiToken: "{{ session('api_token') }}"
  };
</script>
{{-- crop photo --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.js"></script>
<script src="{{ asset('js/post_profil.js') }}"></script>
{{-- himbauan biodata --}}
<script>
  window.idTele = @json($idTele);
</script>
<script src="{{ asset('js/himbauan.js') }}"></script>
{{-- select2 --}}
<script>
  $(document).ready(function() {
    $('.select2').select2();
  });
</script>