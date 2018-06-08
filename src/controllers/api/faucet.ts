import { Request, Response } from "express";
import bitcoin_rpc from "node-bitcoin-rpc";
import util from "util";

const BC_INFO = {
  host: process.env.BC_HOST,
  port: process.env.BC_PORT,
  username: process.env.BC_USERNAME,
  password: process.env.BC_PASSWORD,
  coin_unit: process.env.BC_TRANSFER_COIN_UNIT,
  tx_url_prefix: process.env.BL_WEB_URL + "/tx/",
  block_url_prefix: process.env.BL_WEB_URL + "/block/",
};


export const totalFaucetBalance = (req: Request, res: Response) => {
  bitcoin_rpc.init(BC_INFO.host, BC_INFO.port, BC_INFO.username, BC_INFO.password);
  bitcoin_rpc.call("getbalance", [], async(err: any, data: any) => {
    if (err !== null) {
      console.log("error");
      res.status(422).json({ symbol: "BTC" });
    } else {
      console.log(util.inspect(data.result, false, undefined));
      res.json({ balance: util.inspect(data.result, false, undefined), symbol: "BTC" });
    }
  });
};

export const getFreeCoin = (req: Request, res: Response) => {
  bitcoin_rpc.init(BC_INFO.host, BC_INFO.port, BC_INFO.username, BC_INFO.password);
  const amount_of_coin = BC_INFO.coin_unit;
  const recv_adrr = req.body.wallet;
  bitcoin_rpc.call("sendtoaddress", [recv_adrr, amount_of_coin], (err: any, resCoin: any) => {
    if (err !== null) {
      console.log(err);
      return res.json("err");
    } else if (resCoin.error) {
      console.log(util.inspect(resCoin.error, false, undefined));
      return res.json("err");
    } else {
      const tx =  util.inspect(resCoin.result, false, undefined);
      const data = {
        code: 200,
        tx: BC_INFO.tx_url_prefix + tx.substr(1, tx.length - 2)
      };
      console.log(data);
      return res.json(data);
    }
  });
};
