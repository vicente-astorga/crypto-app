import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { helpHttp } from "../helpers/helpHttp";
import { Sparklines, SparklinesLine } from "react-sparklines";
import useFetch from "../hooks/useFetch";
import ClampText from "../components/ClampText";
import SpinLoader from "../components/SpinLoader";

const CoinPage = () => {
  const params = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;
  const { data: coin, error } = useFetch(url);

  return (
    <>
      {coin || error ? (
        error ? (<div>Error {error}</div>)
        :
        (<div className="mx-auto max-w-xl lg:max-w-6xl font-main tracking-wider px-6">
          <div className="flex py-4 items-center justify-between">
            <div className="flex gap-4">
              <img className="h-16" src={coin.image?.large} alt="/" />
              <div>
                <p className="text-3xl">{coin?.name}</p>
                <p className="text-secondary">
                  ({coin.symbol?.toUpperCase()} / USD)
                </p>
              </div>
            </div>
            <div>
              {coin.market_data?.current_price ? (
                <p className="text-2xl">
                  ${coin.market_data.current_price.usd.toLocaleString()}
                </p>
              ) : null}
              <p className="text-secondary w-full text-right">
                {coin.market_data.price_change_percentage_24h.toFixed(2)} %
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="w-full text-right">
                <p>7 Day</p>
              </div>
              <div className="pt-4">
                <Sparklines data={coin.market_data?.sparkline_7d.price}>
                  <SparklinesLine
                    style={{ strokeWidth: 1, fill: "none", stroke: "#aaaaaa" }}
                  />
                </Sparklines>
              </div>
              <div className="flex justify-between py-4">
                <div>
                  <p className="text-secondary text-sm">Market Cap</p>
                  {coin.market_data?.market_cap ? (
                    <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
                  ) : null}
                </div>
                <div>
                  <p className="text-secondary text-sm">Volume (24h)</p>
                  {coin.market_data?.market_cap ? (
                    <p>${coin.market_data.total_volume.usd.toLocaleString()}</p>
                  ) : null}
                </div>
              </div>

              {/* <div className="flex justify-between py-4">
                <div>
                  <p className="text-secondary text-sm">24h High</p>
                  {coin.market_data?.high_24h ? (
                    <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
                  ) : null}
                </div>
                <div>
                  <p className="text-secondary text-sm">24h Low</p>
                  {coin.market_data?.low_24h ? (
                    <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
                  ) : null}
                </div>
              </div> */}
            </div>

            <div>
              <p className="text-xl">Market Stats</p>
              <div className="flex justify-between py-4">
                <div>
                  <p className="text-secondary text-sm">Market Rank</p>
                  {coin.market_cap_rank}
                </div>
                <div>
                  <p className="text-secondary text-sm">Hashing Algorithm</p>
                  {coin.hashing_algorithm ? (
                    <p>{coin.hashing_algorithm}</p>
                  ) : null}
                </div>
                <div>
                  <p className="text-secondary text-sm">Trust Score</p>
                  {coin.tickers ? (
                    <p>{coin.liquidity_score.toFixed(2)}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex justify-between py-4">
                <div>
                  <p className="text-secondary text-sm">Price Change (24h)</p>
                  {coin.market_data ? (
                    <p>
                      {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-secondary text-sm">Price Change (7d)</p>
                  {coin.market_data ? (
                    <p>
                      {coin.market_data.price_change_percentage_7d.toFixed(2)}%
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-secondary text-sm">Price Change (14d)</p>
                  {coin.market_data ? (
                    <p>
                      {coin.market_data.price_change_percentage_14d.toFixed(2)}%
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-between py-4">
                <div>
                  <p className="text-secondary text-sm">Price Change (30d)</p>
                  {coin.market_data ? (
                    <p>
                      {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-secondary text-sm">Price Change (60d)</p>
                  {coin.market_data ? (
                    <p>
                      {coin.market_data.price_change_percentage_60d.toFixed(2)}%
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-secondary text-sm">Price Change (1y)</p>
                  {coin.market_data ? (
                    <p>
                      {coin.market_data.price_change_percentage_1y.toFixed(2)}%
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {coin.description.en && (
            <div className="pt-4 mb-4">
              <p className="text-xl pb-4">About {coin.name}</p>
              <ClampText text={coin.description} />
            </div>
          )}
        </div>)
      ) : (
        <SpinLoader size={1}/>
      )}
    </>
  );
};

export default CoinPage;
