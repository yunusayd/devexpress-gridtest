/* eslint-disable */
import ArrayStore from "devextreme/data/array_store";
import { inherits } from "util";

let orderCountLimit = 5;
let posCountLimit = 5;
let colCountLimit = 5;
const symbols = [
  "AEFES.E",
  "AFYON.E",
  "AKBNK.E",
  "AKSA.E",
  "AKSEN.E",
  "ALARK.E",
  "ALBRK.E",
  "ALGYO.E",
  "ANACM.E",
  "ANELE.E",
  "ARCLK.E",
  "ASELS.E",
  "BERA.E",
  "BIMAS.E",
  "BJKAS.E",
  "BRSAN.E",
  "CCOLA.E",
  "CEMAS.E",
  "CEMTS.E",
  "DEVA.E",
  "DGKLB.E",
  "DOAS.E",
  "DOHOL.E",
  "ECILC.E",
  "ECZYT.E",
  "EGEEN.E",
  "EKGYO.E",
  "ENJSA.E",
  "ENKAI.E",
  "EREGL.E",
  "FENER.E",
  "FLAP.E",
  "FROTO.E",
  "GARAN.E",
  "GENTS.E",
  "GEREL.E",
  "GLYHO.E",
  "GOLTS.E",
  "GOODY.E",
  "GOZDE.E",
  "GSDHO.E",
  "GSRAY.E",
  "GUBRF.E",
  "HALKB.E",
  "HEKTS.E",
  "HURGZ.E",
  "ICBCT.E",
  "IEYHO.E",
  "IHLAS.E",
  "IHLGM.E",
  "IPEKE.E",
  "ISCTR.E",
  "ISDMR.E",
  "ISFIN.E",
  "ISGYO.E",
  "ITTFH.E",
  "KARSN.E",
  "KARTN.E",
  "KCHOL.E",
  "KORDS.E",
  "KOZAA.E",
  "KOZAL.E",
  "KRDMD.E",
  "MAVI.E",
  "METRO.E",
  "MGROS.E",
  "MPARK.E",
  "NETAS.E",
  "NTHOL.E",
  "ODAS.E",
  "OTKAR.E",
  "OZKGY.E",
  "PETKM.E",
  "PGSUS.E",
  "POLHO.E",
  "PRKME.E",
  "SAHOL.E",
  "SASA.E",
  "SISE.E",
  "SKBNK.E",
  "SODA.E",
  "SOKM.E",
  "TATGD.E",
  "TAVHL.E",
  "TCELL.E",
  "THYAO.E",
  "TKFEN.E",
  "TMSN.E",
  "TOASO.E",
  "TRKCM.E",
  "TSKB.E",
  "TTKOM.E",
  "TTRAK.E",
  "TUPRS.E",
  "ULKER.E",
  "VAKBN.E",
  "VESTL.E",
  "YATAS.E",
  "YKBNK.E",
  "ZOREN.E",
  "ACSEL.E",
  "ADANA.E",
  "ADBGR.E",
  "ADEL.E",
  "ADESE.E",
  "ADNAC.E",
  "AGHOL.E",
  "AGYO.E",
  "AKCNS.E",
  "AKENR.E",
  "AKFGY.E",
  "AKGRT.E",
  "AKGUV.E",
  "AKMGY.E",
  "AKSGY.E",
  "AKSUE.E",
  "ALCAR.E",
  "ALCTL.E",
  "ALKA.E",
  "ALKIM.E",
  "ALYAG.E",
  "ANHYT.E",
  "ANSGR.E",
  "ARENA.E",
  "ARMDA.E",
  "ARSAN.E",
  "ASLAN.E",
  "ASUZU.E",
  "ATAGY.E",
  "ATEKS.E",
  "AVGYO.E",
  "AVISA.E",
  "AVOD.E",
  "AVTUR.E",
  "AYEN.E",
  "AYGAZ.E",
  "BAGFS.E",
  "BAKAB.E",
  "BANVT.E",
  "BEYAZ.E",
  "BFREN.E",
  "BIZIM.E",
  "BLCYT.E",
  "BNTAS.E",
  "BOLUC.E",
  "BOSSA.E",
  "BOYP.E",
  "BRISA.E",
  "BRKSN.E",
  "BRMEN.E",
  "BRYAT.E",
  "BSOKE.E",
  "BTCIM.E",
  "BUCIM.E",
  "BURCE.E",
  "CELHA.E",
  "CIMSA.E",
  "CLEBI.E",
  "CMBTN.E",
  "CMENT.E",
  "CRDFA.E",
  "CRFSA.E",
  "CUSAN.E",
  "DAGI.E",
  "DENCM.E",
  "DENGE.E",
  "DENIZ.E",
  "DERIM.E",
  "DESPC.E",
  "DGATE.E",
  "DGGYO.E",
  "DGZTE.E",
  "DITAS.E",
  "DMSAS.E",
  "DOCO.E",
  "DOGUB.E",
  "DOKTA.E",
  "DURDO.E",
  "DYOBY.E",
  "DZGYO.E",
  "EDIP.E",
  "EGGUB.E",
  "EGPRO.E",
  "EGSER.E",
  "EMKEL.E",
  "ERBOS.E",
  "ERSU.E",
  "ESCOM.E",
  "EUHOL.E",
  "FMIZP.E",
  "FONET.E",
  "FORMT.E",
  "GARFA.E",
  "GEDZA.E",
  "GLRYH.E",
  "GSDDE.E",
  "GUSGR.E",
  "HATEK.E",
  "HDFGS.E",
  "HLGYO.E",
  "IHEVA.E",
  "IHGZT.E",
  "IHYAY.E",
  "INDES.E",
  "INTEM.E",
  "ISGSY.E",
  "ISMEN.E",
  "IZFAS.E",
  "IZMDC.E",
  "IZOCM.E",
  "JANTS.E",
  "KAPLM.E",
  "KAREL.E",
  "KATMR.E",
  "KENT.E",
  "KERVT.E",
  "KFEIN.E",
  "KLGYO.E",
  "KLMSN.E",
  "KLNMA.E",
  "KNFRT.E",
  "KONYA.E",
  "KRDMA.E",
  "KRDMB.E",
  "KRONT.E",
  "KRSTL.E",
  "KRTEK.E",
  "KUTPO.E",
  "KUYAS.E",
  "LIDFA.E",
  "LINK.E",
  "LKMNH.E",
  "LOGO.E",
  "MAALT.E",
  "MAKTK.E",
  "MARKA.E",
  "MARTI.E",
  "MCTAS.E",
  "MEPET.E",
  "MERKO.E",
  "METUR.E",
  "MIPAZ.E",
  "MNDRS.E",
  "MRDIN.E",
  "MRGYO.E",
  "MRSHL.E",
  "MSGYO.E",
  "NIBAS.E",
  "NUGYO.E",
  "NUHCM.E",
  "OLMIP.E",
  "ORGE.E",
  "OSMEN.E",
  "OSTIM.E",
  "OYLUM.E",
  "OZBAL.E",
  "OZGYO.E",
  "PAGYO.E",
  "PARSN.E",
  "PEGYO.E",
  "PEKGY.E",
  "PENGD.E",
  "PETUN.E",
  "PINSU.E",
  "PKART.E",
  "PNSUT.E",
  "POLTK.E",
  "PRKAB.E",
  "PRZMA.E",
  "PSDTC.E",
  "QNBFB.E",
  "RAYSG.E",
  "RHEAG.E",
  "RTALB.E",
  "RYGYO.E",
  "RYSAS.E",
  "SAFKR.E",
  "SAMAT.E",
  "SANEL.E",
  "SANKO.E",
  "SARKY.E",
  "SAYAS.E",
  "SEKFK.E",
  "SEKUR.E",
  "SELEC.E",
  "SEYKM.E",
  "SILVR.E",
  "SKTAS.E",
  "SNGYO.E",
  "SNPAM.E",
  "SONME.E",
  "SRVGY.E",
  "TBORG.E",
  "TDGYO.E",
  "TEKTU.E",
  "TGSAS.E",
  "TIRE.E",
  "TKNSA.E",
  "TLMAN.E",
  "TMPOL.E",
  "TRCAS.E",
  "TRGYO.E",
  "TSGYO.E",
  "TSPOR.E",
  "TUCLK.E",
  "TUKAS.E",
  "TURGG.E",
  "ULAS.E",
  "ULUSE.E",
  "ULUUN.E",
  "UNYEC.E",
  "USAK.E",
  "UTPYA.E",
  "VAKFN.E",
  "VAKKO.E",
  "VANGD.E",
  "VERTU.E",
  "VERUS.E",
  "VESBE.E",
  "VKGYO.E",
  "VKING.E",
  "YAYLA.E",
  "YESIL.E",
  "YGGYO.E",
  "YGYO.E",
  "YKGYO.E",
  "YUNSA.E",
  "YYAPI.E",
  "BURVA.E",
  "DIRIT.E",
  "IZTAR.E",
  "MEGAP.E",
  "OZRDN.E",
  "RODRG.E",
  "TACTR.E",
  "TKURU.E",
  "YAPRK.E",
  "GRNYO.E",
  "ATLAS.E",
  "ETYAT.E",
  "EUKYO.E",
  "EUYO.E",
  "ISYAT.E",
  "MTRYO.E",
  "OYAYO.E",
  "VKFYO.E"
];

const marketPxs = [];
const accts = [];

const orders = [];

const positions = [];
const collaterals = [];

const fills = [];

export function setOrderCount(orderCount) {
  if (orderCount > 0) orderCountLimit = orderCount;
}

export function getParamInt(paramName) {
  try {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    var num = Number(params.get(paramName));
    if (num > 0) return num;
  } catch (err) {}
  return 0;
}
var inited = false;
export function init() {
  if (inited) return;
  inited = true;

  for (let i = 1; i <= symbols.length; i++) {
    marketPxs.push({
      ISIN: symbols[i],
      Px: 5 + Math.floor(Math.random() * 1000) / 100,
      Change: 0
    });
  }

  for (let i = 1; i <= symbols.length; i++) {
    accts.push(53023 + i);
  }

  for (let i = 1; i <= posCountLimit; i++) {
    
    let symIx = Math.floor(Math.random() * (symbols.length - 1));
    let symbol = marketPxs[symIx];
    let acct = accts[0];

    let qty = Math.floor(Math.random() * 100) + 100;
    let px = symbol.Px;
    let amt = px * qty;

    positions.push({
      Key: i.toString(),
      Acct: acct,
      Sym: symbol,
      Qty: qty,
      Px: px,
      LstPx: px,
      Amt: amt
    });
  }

  let acct = accts[0];

  collaterals.push({
    Key: "1",
    Acct: acct,    
    SessionCol: 12000,
    Amt: 12000,
    TotalPL: 2000
  });  

  collaterals.push({
    Key: "2",
    Acct: acct,    
    SessionCol: 104,
    Amt: 104,
    TotalPL: 4
  });  

  for (let i = 1; i <= orderCountLimit; i++) {
    let symIx = Math.floor(Math.random() * (symbols.length - 1));
    let symbol = marketPxs[symIx];
    let acct = accts[Math.floor(Math.random() * (accts.length - 1))];

    let qty = Math.floor(Math.random() * 100) + 100;
    let px = symbol.Px;
    let amt = px * qty;

    orders.push({
      OrderId: (i + 7000).toString(),
      Acct: acct,
      Sym: symbol,
      Qty: qty,
      CumQty: 0,
      Px: px,
      Amt: amt,
      FillAmt: 0
    });
  }

  setInterval(() => {
    for (var i = 0; i < 1; i++) {
      addFill();
    }
  }, 200);
}

export const ordersStore = new ArrayStore({
  key: "OrderId",
  data: orders
});

export const fillsStore = new ArrayStore({
  key: "FillId",
  data: fills
});

export const positionsStore = new ArrayStore({
  key: "Key",
  data: positions
});

export const collateralsStore = new ArrayStore({
  key: "Key",
  data: collaterals
});

export function getOrderCount() {
  return orders.length;
}
let lastFillId = 5000;

export function addFill() {
  lastFillId++;
  let rnd = Math.random();
  const order = orders[Math.round(rnd * (orderCountLimit - 1))];
  let leavesQty = order.Qty - order.CumQty;
  if (leavesQty > 0) {
    let fillQty = Math.round(rnd * (leavesQty - 1)) + 1;
    if (fillQty > leavesQty) {
      fillQty = leavesQty;
    }
    // Math.round(Math.random() * (leavesQty - 1)) + 1
    let fillPx = order.Px - rnd * 0.1;
    let amt = fillPx * fillQty;
    const fill = {
      OrderId: order.OrderId.toString(),
      FillId: lastFillId,
      FillTime: new Date(),
      FillQty: fillQty,
      FillPx: fillPx,
      FillAmt: amt
    };

    fillsStore.push([{ type: "insert", data: fill }]);
    // console.debug('Order CumQtyChanged FillId:' + fill.FillId + ' FillQty:' + fill.FillQty + ' Order.CumQty:' + order.CumQty)
    ordersStore.push([
      {
        type: "update",
        key: order.OrderId.toString(),
        data: {
          CumQty: order.CumQty + fill.FillQty,
          FillAmt: order.FillAmt + amt
        }
      }
    ]);
  }
  if (order.Sym.Px < order.Px + 0.75) {
    order.Sym.Change = 0.25;
  } else {
    order.Sym.Change = -2.5;
  }
  order.Sym.Px += order.Sym.Change;
}
