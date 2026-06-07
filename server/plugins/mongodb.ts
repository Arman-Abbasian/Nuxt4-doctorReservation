import mongoose from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()

  try {
    await mongoose.connect(config.mongoURI as string)
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ DB connection error:', err)
  }
})
