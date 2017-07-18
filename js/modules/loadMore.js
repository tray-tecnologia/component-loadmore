 /**
  * author: Taynara Sene
  * github: taahsene
  *
  * Load More para loja Tray Commerce- Opencode
  *
  * Options
  * productsGrid = Deve receber a classe que da showcase da listagem de produtos;
  * pagenationContainer = Deve receber a classe da paginação padrão;
  * totalPages = Deve receber o total de paginas da categoria/busca atual **(Twig {{ paginate.params.pageCount }})
  * itemsPerRow = Recebe a quantidade maxima de Itens por Linha;
  * buttonLoadMore = Deve receber a classe contina do botão "LoadMore" na pagina de categoria/busca;
  *
  * Defaults
  * currentPage = Pagina Atual;
  * totalPages = Total de Paginas;
  * pagesLoaded = Paginas Cattegads;
  * url_atual = Recebe a Url Atual;
  *
  */

jQuery.fn.loadpage = function (options) {
  var defaults = {
      loading: false,
      currentPage: 1,
      totalPages: 0,
      pagesLoaded: 0,
      url_atual: " "
  };
  var settings = jQuery.extend({}, defaults, options);

  init();

  function init() {

      jQuery(settings.buttonLoadMore).bind('click', loadMoreClick);
      jQuery(settings.pagenationContainer).hide();
      settings.url_atual = window.location.href;
  };


  function loadMoreClick(e) {
      if (settings.currentPage < settings.totalPages) {
        jQuery(settings.buttonLoadMore).show();
          if (!settings.loading)
              loadMore();
      }else {
        jQuery(settings.buttonLoadMore).hide();
      }
  };

  function load(load) {
    if(load){
      jQuery('.reload').show();
    }
    if(!load){
      jQuery('.reload').hide();
    }

  }

  function loadMore() {
    settings.loading = true;
    load(settings.loading);
    var url = settings.url_atual.concat("&page="+(settings.currentPage+1));
    jQuery.get(url, function (data) {
      var page = jQuery(data);
      var products = jQuery(settings.productsGrid + ' ul li', page);

      jQuery.each(products, function (value, i) {
        var count = jQuery(settings.productsGrid + ' ul').last().children().size();
        if (count < settings.itemsPerRow) {
          jQuery(settings.productsGrid + ' ul').last().show();
        } else {
          jQuery(settings.productsGrid).append('<ul class="row"></ul>');
        }
          jQuery(settings.productsGrid + ' ul').last().append('<li class="col-md-4 col-sm-6 col-xs-12 product-item">' + jQuery(this).html() + '</li>');
      });
      settings.loading = false;
      settings.currentPage++;
      settings.pagesLoaded++;
      load(settings.loading);

      if (settings.currentPage == settings.totalPages) {
          jQuery(settings.buttonLoadMore).hide();
      }
    });
  };

  return this;
}
