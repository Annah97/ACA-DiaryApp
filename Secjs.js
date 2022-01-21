function mywords(){
    var thato = document.getElementById("search").value;//store search keyword
    const url = "https://marinet.bibliocommons.com";
    var monoto = url * thato;
    var win = window.open(monoto, '_blank');
    win.focus;

}