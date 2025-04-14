const server = new Deno.Command("deno", {
  args: ["run" ,"start"],
  env: {
      DATABASE_URL: ':memory:',
      TEST_MODE: 'true',
      ENTITY_DB:"libsql",
  },
  stdout: "inherit",
  stderr: "inherit"
});

const sp = server.spawn();
console.log("Starting server...")
await new Promise(resolve => setTimeout(resolve, 2000));

const withUI = Deno.args.some((arg)=>(arg === '--ui'))
const testing = new Deno.Command("pnpm", {
  args: ["exec", "playwright", "test", withUI ? "--ui" : ""],
  stdout: "inherit",
  stderr: "inherit",
  windowsRawArguments:true
})

const tp = testing.spawn();
const { code } = await tp.status;
if (code === 0) {
  console.log("Testing complete")
}
sp.kill();


