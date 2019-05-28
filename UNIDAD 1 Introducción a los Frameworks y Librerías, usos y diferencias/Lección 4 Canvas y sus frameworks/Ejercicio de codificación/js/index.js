var width = 556;
var height = 316;
var tween = null;

    function addStar(layer, stage) {
        var scale = Math.random();

        var star = new Konva.Star({
            x: Math.random() * stage.getWidth(),
            y: Math.random() * stage.getHeight(),
            numPoints: 5,
            innerRadius: 30,
            outerRadius: 50,
            fill: '#f9f120',
            opacity: 0.8,
            draggable: true,
            scale: {
                x : scale,
                y : scale
            },
            rotation: Math.random() * 180,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffset: {
                x : 5,
                y : 5
            },
            shadowOpacity: 0.6,
            startScale: scale
        });

        layer.add(star);
        var angularSpeed = 90;
        var period = 7000;
        var anim = new Konva.Animation(function(frame) {
            var angleDiff = frame.timeDiff * angularSpeed / 1000;
            var newscale = Math.sin(frame.time * 2 * Math.PI / period) + 0.001;
            star.scale({ x :scale + newscale, y : scale + newscale});
            star.rotate(angleDiff);
        }, layer);

    anim.start();

    }
    var stage = new Konva.Stage({
        container: 'dibujo',
        width: width,
        height: height
    });

    var layer = new Konva.Layer();
    var dragLayer = new Konva.Layer();

    for(var n = 0; n < 10; n++) {
        addStar(layer, stage);
    }

    stage.add(layer);
    stage.add(dragLayer);
