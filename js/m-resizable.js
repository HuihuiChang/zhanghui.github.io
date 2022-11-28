function resize() {
    // let s = window.screen.width / 1920;
    let s = window.innerWidth / 1920;
    document.body.style.zoom = s;
}

window.onresize = function() {
    resize();
}
resize();