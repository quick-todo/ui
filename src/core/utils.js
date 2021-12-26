export async function thunkWrapper(call, rejected) {
  try {
    const data = await call
    return data
  } catch (error) {    
    return rejected(error)
  }
}