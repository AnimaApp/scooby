import { Cluster } from "puppeteer-cluster";

export const withCluster = async <
  TClusterTaskInput,
  TClusterTaskOutput,
  TFnReturn
>(
  fn: (browser: Cluster<TClusterTaskInput, TClusterTaskOutput>) => TFnReturn,
  options: {
    maxConcurrency: number;
  }
): Promise<TFnReturn> => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_BROWSER,
    maxConcurrency: options.maxConcurrency,
    puppeteerOptions: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    },
    monitor: true,
    retryLimit: 4,
    retryDelay: 100,
  });
  try {
    return await fn(cluster);
  } finally {
    console.log("closing puppeteer cluster...");
    await cluster.close();
  }
};
