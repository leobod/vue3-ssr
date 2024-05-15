import { request } from "./request";

export const _asyncData = {
  value: {},
};

// 判断是否在服务器端运行
export const isServer = function () {
  return typeof window === "undefined";
};

export const getAsyncKey = function (config, key = "") {
  let asyncKey = "";
  let toBase64 = null;
  if (isServer()) {
    toBase64 = (val) => Buffer.from(val).toString("base64");
  } else {
    toBase64 = btoa;
  }
  asyncKey = key
    ? key
    : toBase64(encodeURIComponent(JSON.stringify(config.url)));
  return asyncKey;
};

export const serverAsyncData = function (config, _data = {}, key = "") {
  return new Promise((resolve) => {
    const result = {
      pending: "pending", // fulfilled rejected pending
      data: null,
    };
    if (isServer()) {
      const asyncKey = getAsyncKey(config, key);
      request(config)
        .then((res) => {
          result.pending = "fulfilled";
          result.data = res;
        })
        .catch((e) => {
          result.pending = "rejected";
          result.data = null;
        })
        .finally(() => {
          _data[asyncKey] = result;
          resolve(result);
        });
    } else {
      resolve(result);
    }
  });
};

export const clientAsyncData = function (config) {
  return new Promise((resolve) => {
    const result = {
      pending: "pending", // fulfilled rejected pending
      data: null,
    };
    request(config)
      .then((res) => {
        result.pending = "fulfilled";
        result.data = res;
      })
      .catch((e) => {
        result.pending = "rejected";
        result.data = null;
      })
      .finally(() => {
        resolve(result);
      });
  });
};

export const getAsyncData = function () {
  let asyncData = {};
  if (!isServer() && window._asyncData) {
    asyncData = window._asyncData;
  } else {
    asyncData = _asyncData.value;
  }
  return asyncData;
};

export const useAsyncData = function (config, key = "") {
  const asyncData = getAsyncData();
  const asyncKey = getAsyncKey(config, key);
  let result = {
    pending: "pending", // fulfilled rejected pending
    data: null,
  };
  console.log(asyncData);
  if (asyncData[asyncKey] && asyncData[asyncKey].pending === "fulfilled") {
    result = asyncData[asyncKey];
    return {
      then: function (fn) {
        let val = result;
        if (fn instanceof Function) {
          fn(val);
        }
      },
    };
  } else {
    return clientAsyncData(config);
  }
};
