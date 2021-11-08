
  window.googletag = window.googletag || {cmd: [] };
  googletag.cmd.push(function () {
      var responsiveAdSlot =
  googletag.defineSlot('/6355419/Travel/Europe',
  [[300, 250], [728, 90], [750, 200]], 'responsive-ad')
  .addService(googletag.pubads());

  let  mapping =  googletag.sizeMapping()

  let Desktop = {
    viewPort: [992, 0],
  sizes: [[300, 250], [1, 1]]
        };

  let Tablet = {
    viewPort: [992, 0],
  sizes: [[300, 250], [1, 1]]
        };

  let Mobile = {
    viewPort: [992, 0],
  sizes: [[300, 250], [1, 1]]
        };


  mapping.addSize(Desktop.viewPort, Desktop.sizes);
  mapping.addSize(Mobile.viewPort, Mobile.sizes);
  mapping.addSize(Tablet.viewPort, Tablet.sizes);
  slot = responsiveAdSlot.addService(googletag.pubads())
  googletag.pubads().enableSingleRequest();

  // Start ad fetching
  googletag.enableServices();



      });
