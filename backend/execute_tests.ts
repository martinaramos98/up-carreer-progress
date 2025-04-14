const server = new Deno.Command("deno", {
  args: ["run", "dev"],
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


const testing = new Deno.Command("deno", {
  args: ["run","--allow-all","npm:playwright/test", "test"],
  stdout: "inherit",
  stderr: "inherit"
})

const tp = testing.spawn();
const { code } = await tp.status;
if (code === 0) {
  console.log("Testing complete")
}
sp.kill();


