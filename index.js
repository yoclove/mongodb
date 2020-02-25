const express = require('express');
const mongoose = require('mongoose');
const app = express()


/*mongoose.connect("mongodb://zhe:a799305728@ds131621.mlab.com:31621/shoes",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

*/



/*mongoose.connect("mongodb+srv://panzhe:a123456@cluster0-x9fnh.azure.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
*/



mongoose.connect('mongodb+srv://root:a123456@cluster0-bwbos.azure.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology:true
});

const schema = new mongoose.Schema({
  	name: { type: String },
	parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Post"}
})

schema.virtual()



const Post = mongoose.model('Post', schema)

app.get('/', function(req, res){
	res.send('ok')
})

app.get('/posts', async function(req, res){
	try {
	/*	const allPosts = await Post.aggregate([
			{ $match: {name: "新闻"} }	
		])*/
		const allPosts = await Post.find().populate('parent', 'name')
		res.send(allPosts)
	 } catch(err) {
	   console.log(err)
	 }
	 
})

app.get('/add', async (req, res) => {
	try {
		
		
		// var post = await Post.create()
		// var post = await Post.insertMany(cats)
		// res.send(post)
		res.send(1)
	 } catch(err) {
	   console.log(err)
	 }
})
var server = require('http').createServer(app).listen(5000);

