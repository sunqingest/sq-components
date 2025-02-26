export const initVirtual = (param, update) => {
  const range = {
    start: 0,
    end: 0,
    padFront: 0,
    padBehind: 0,
  };

  const getPadFront = () => {
    return param.estimateSize * range.start;
  };

  const getPadBehind = () => {
    const lastIndex = param.uniqueIds.length - 1;
    return (lastIndex - range.end) * param.estimateSize;
  };

  const updateRange = (start, end) => {
    range.start = start;
    range.end = end;
    range.padFront = getPadFront();
    range.padBehind = getPadBehind();

    update({ ...range });
  };

  // 计算边界值
  const checkRange = (start, end) => {
    const total = param.uniqueIds.length;
    const { keeps } = param;
    if (total < keeps) {
      // 总数就小于 虚拟列表的每页默认展示条数
      start = 0;
      end = total - 1;
    } else if (end - start < keeps - 1) {
      // 滑到最后 保证start的值 是end的值 减去keeps的值
      start = end - keeps - 1;
    }
    updateRange(start, end);
  };

  checkRange(0, param.keeps - 1);

  // 记录上次滚动的值
  let offsetValue = 0;

  const getEndByStart = (start) => {
    const endResult = start + param.keeps - 1;
    const end = Math.min(endResult, param.uniqueIds.length - 1);
    return end;
  };

  const handleFront = () => {
    // 当前鼠标滚动的距离 除以 大概的每个的高度
    let covers = Math.floor(offsetValue / param.estimateSize);
    if (covers > range.start) {
      // 假设现在是从第三十个开始的 keeps是30 然后假设当前covers已经滚过40个 那么就不需要更新range
      return;
    }
    // 计算开始值 需要减去缓冲区
    // 需要判断一下 缓冲区减去之后小于0 假设现在start是8 缓冲区是10 相减-2  需要math.max
    let start = Math.max(covers - param.buffer, 0);
    checkRange(start, getEndByStart(start));
  };

  // 处理鼠标向后滚动
  const handleBehind = () => {
    let covers = Math.floor(offsetValue / param.estimateSize);
    if (covers < range.start + param.buffer) {
      return;
    }
    checkRange(covers, getEndByStart(covers));
  };

  const handleScroll = (offset) => {
    // 判断鼠标滚动的方向
    let direction = offset < offsetValue ? "FRONT" : "BEHIND";
    offsetValue = offset;
    if (direction == "FRONT") {
      handleFront();
    } else if (direction == "BEHIND") {
      handleBehind();
    }
  };

  return { handleScroll };
};
