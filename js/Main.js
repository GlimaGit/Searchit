document.getElementById('formulario').addEventListener('submit', pesquisarFilme);

function pesquisarFilme(e){
    var textPesquisa = document.getElementById('pesquisar').value;
    buscaFilmes(textPesquisa);
    e.preventDefault();
}

function buscaFilmes(textPesquisa){
    axios.get('http://www.omdbapi.com/?apikey=thewdb&s=' + textPesquisa)
        .then(function (response) {
            console.log(response);
            var filmes = response.data.Search;
            var mostrarFilmes = '';

            for(var i = 0; i < filmes.length; i++){
                mostrarFilmes += `
			  <div class="col-sm-6 col-md-4">
			    <div class="thumbnail">
			      <img src="${filmes[i].Poster}" class="img-thumbnail">
			        <h4>${filmes[i].Title}</h4>
			        <p><a href="#" class="btn btn-primary" role="button" 
			        onclick="filmeDetalhes('${filmes[i].imdbID}')">Ver Detalhes</a></p>
			      </div>
			    </div>
			  </div>
    	`;
            }

            document.getElementById('filmes').innerHTML = mostrarFilmes;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function filmeDetalhes(id){
    sessionStorage.setItem('filmeID', id);
    window.location = 'detalhes.html';
    return false;
}

function mostraFilme() {
    var filmeID = sessionStorage.getItem('filmeID');

    axios.get('http://www.omdbapi.com/?apikey=thewdb&i=' + filmeID)
        .then(function (response) {
            var filme = response.data;
            console.log(filme);
            var mostraFilme = `
                          <div class="col-md-6">
                            <img src="${filme.Poster}" class="img-responsive">
                            <hr>
                            <p> <h1><strong>${filme.Title}</strong></h1></p>
                             <hr>
                          </div>
                          <hr>
                          <hr>
                          <div class="col-md-6">
                            <div class="well clearfix">
                              <ul class="list-group">
                                <li class="list-group-item"><strong><b>Gênero:  </b></strong>${filme.Genre}</li>
                                <li class="list-group-item"><strong><b>Lancamento: </b></strong>${filme.Released}</li>
                                <li class="list-group-item"><strong><b>Duração: </b></strong>${filme.Runtime}</li>
                                <li class="list-group-item"><strong><b>Idiomas: </b></strong>${filme.Language}</li>
                                <li class="list-group-item"><strong><b>Prêmios: </b></strong>${filme.Awards}</li>
                                <li class="list-group-item"><strong><b>Atores: </b></strong>${filme.Actors}</li>
                              </ul>
                              <hr>
                              <h3><b>Descrição</b></h3>
                              ${filme.Plot}
                              <hr>
                              <a href="http://imdb.com/title/${filme.imdbID}" target="_blank" class="btn btn-success pull-left">Ver no iMDB</a>
                              <a href="index.html"  class="btn btn-default"> <b>Voltar</b> </a>
                            </div>  
                          </div>
    `;

            document.getElementById('filmes').innerHTML = mostraFilme;
        })
        .catch(function (error) {
            console.log(error);
        });

}





