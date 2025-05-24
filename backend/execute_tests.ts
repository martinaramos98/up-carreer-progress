Deno.writeFileSync("db_test.db",new Uint8Array());
const server = new Deno.Command("deno", {
  args: ["run", "start"],
  env: {
    DATABASE_URL: "file:./db_test.db",
    TEST_MODE: "true",
    ENTITY_DB: "libsql",
  },
  stdout: "piped",
  stderr: "inherit",
});
console.log("Starting server...");
const sp = server.spawn();
const [stream1, stream2] = sp.stdout.tee();
const stream = stream1.pipeThrough(new TextDecoderStream()).pipeThrough(
  new TransformStream({
    transform(chunk, controller) {
      chunk.split("\n").forEach((line) => controller.enqueue(line));
    },
  }),
);

const reader = stream.getReader();
let readyForTest = false;
while (!readyForTest) {
  const { value: line, done } = await reader.read();
  if (done) break;
  console.log(line);
  if (line === "READY_FOR_TEST") {
    readyForTest = true;
  }
}

reader.releaseLock();
stream2.pipeTo(Deno.stdout.writable, {
  preventClose: true,
});

if(!readyForTest){
  console.error("Server not ready for testing");
  sp.kill();
  Deno.exit(1);
}
const withUI = Deno.args.some((arg) => (arg === "--ui"));
const testing = new Deno.Command("deno", {
  args: ["run", "--allow-all", "npm:playwright", "test", withUI ? "--ui" : ""],
  stdout: "inherit",
  stderr: "inherit",
  windowsRawArguments: true,
});

const tp = testing.spawn();
const { code } = await tp.status;
if (code === 0) {
  console.log("Testing complete");
}
sp.kill();
Deno.removeSync("db_test.db");
Deno.exit(code);
