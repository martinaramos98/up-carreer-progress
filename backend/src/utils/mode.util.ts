
export function dbModeByEnv(){
  if(Deno.env.get("TEST_MODE") === "true"){
    return ":memory:"
  }
  return  Deno.env.get("DATABASE_URL") as string
}