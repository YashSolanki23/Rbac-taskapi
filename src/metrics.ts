
import * as client from "prom-client"

export const register = new client.Registry();

client.collectDefaultMetrics({register});

export const requestCounter = new client.Counter({
  name:"http_requests_total",
  help:"Total HTTP requests",
  registers:[register]
});

export const requestDuration = new client.Histogram({
  name: "http_request_duration_ms",
  help:"Request duration in ms",
  buckets:[10,50,100,300,500,1000],
  registers:[register]
});