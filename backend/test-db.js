import mongoose from 'mongoose';

const uri = "mongodb+srv://admin:MyStrongPassword123@cluster0.whakarp.mongodb.net/team-task-manager?retryWrites=true&w=majority&appName=Cluster0";

async function test() {
  try {
    console.log('Connecting...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('Success! Connected.');
    process.exit(0);
  } catch (err) {
    console.error('Failed!', err.message);
    process.exit(1);
  }
}

test();
