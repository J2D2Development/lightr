import React, { Component } from 'react';

class MyCanvas extends Component {
    /*eslint-disable*/
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.createCanvas();
    }

    createCanvas = () => {
        const canvas = document.getElementById('can');
        const ctx = canvas.getContext('2d');
        
        function draw() {
            ctx.canvas.height = window.innerHeight;
            ctx.canvas.width = window.innerWidth;
            ctx.fillStyle = '#cccccc';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        draw();

        window.onresize = function() {
            draw();
        }
    }

    render() {
        return(
            <canvas id="can"></canvas>
        );
    }
}

export default MyCanvas;