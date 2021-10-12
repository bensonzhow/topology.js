import { Pen } from '../core/src/pen';

declare const window: any;
export function radio(ctx: CanvasRenderingContext2D, pen: any) {
  if (!pen.onDestroy) {
    pen.onAdd = onAdd;
  }

  let x = pen.calculative.worldRect.x;
  let y = pen.calculative.worldRect.y;
  let w = pen.calculative.worldRect.width;
  let h = pen.calculative.worldRect.height;
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.stroke();
  ctx.closePath();

  return false;
}

function onAdd(pen: any) {
  console.log('进入radio');
  let x = pen.calculative.worldRect.x;
  let y = pen.calculative.worldRect.y;
  let w = pen.calculative.worldRect.width;
  let h = pen.calculative.worldRect.height;

  if (pen.direction == 'horizontal') {
    let length = pen.options.length;
    for (let i = 0; i < length; i++) {
      let childPen: any = {
        name: 'radioItem',
        x: x + (i * w) / length,
        y: y,
        width: w / length,
        height: h,
        isChecked: pen.selection === pen.options[i],
        text: pen.options[i],
        textLeft: (h * 6) / 5,
        fillColor: '#1890ff',
      };
      window.topology.canvas.makePen(childPen);
      window.topology.pushChildren(pen, [childPen]);
    }
  } else if (pen.direction == 'vertical') {
    let length = pen.options.length;
    for (let i = 0; i < length; i++) {
      let childPen: any = {
        name: 'radioItem',
        x: x,
        y: y + ((i * h) / (length * 2 - 1)) * 2,
        width: w,
        height: h / (length * 2 - 1),
        isChecked: pen.selection === pen.options[i],
        text: pen.options[i],
        textLeft: ((h / (length * 2 - 1)) * 6) / 5,
        fillColor: '#1890ff',
      };
      window.topology.canvas.makePen(childPen);
      window.topology.pushChildren(pen, [childPen]);
    }
  }
}