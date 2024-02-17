import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
	providedIn: 'root'
})
export class UploadService {

	constructor() { }

	makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	getFileExtension(filename) {
		var array = filename.split('.');
		return array[array.length - 1];
	}

	uploadFile(file, cb) {

		console.log(file);
		const contentType = file.type;

		if (this.getFileExtension(file.name) != 'jpg') {
			console.log('There was an error uploading your file: jpg');

			return;
		}

		const bucket = new S3({
			accessKeyId: "AKIAXYKJUA4RH324TEFZ",
			secretAccessKey: "QcvWJpf48E8GKTCIJLMm9e7manPKZjXFbLZO3Nbu",
		});

		var ref = this.makeid(8) + '-' + new Date().getTime();

		const params = {
			Bucket: 'happimobiles', // pass your bucket name
			Key: 'happi/' + ref + "." + this.getFileExtension(file.name), // file will be saved as testBucket/contacts.csv
			ContentType: file.type,
			Body: file,
			ACL: "public-read"
		};


		bucket.upload(params, function (err, data) {
			if (err) {
				console.log('There was an error uploading your file: ', err);
				//return false;
			}
			console.log('Successfully uploaded file.', data);
			//return true;
			cb(err, ref);
		});
	}
	uploadFileAny(file, cb) {

		console.log(file);
		const contentType = file.type;

		const bucket = new S3({
			accessKeyId: "AKIAXYKJUA4RH324TEFZ", 
			secretAccessKey: "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",
			region:'ap-south-1'
		});

		var ref = this.makeid(8) + '-' + new Date().getTime()+ "." + this.getFileExtension(file.name);

		const params = {
			Bucket: 'happiwedding', // pass your bucket name
			Key: `events/` + ref , // file will be saved as testBucket/contacts.csv
			ContentType: file.type,
			Body: file,
			ACL: "public-read"
		};
          

		bucket.upload(params, function (err, data) {
			console.log(params);
			if (err) {
				console.log('There was an error uploading your file: ', err);
				//return false;
			}
			console.log('Successfully uploaded file.', data);
			//return true;
			cb(err, ref);
		});
	}
	uploadFilePdf(file,id, cb,) {
         
		console.log(file);
		const contentType = file.type;

		const bucket = new S3({
			accessKeyId: "AKIAXYKJUA4RH324TEFZ", 
			secretAccessKey: "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",
		});

		var ref = this.makeid(8) + '-' + new Date().getTime()+ "." + this.getFileExtension(file.name);

		const params = {
			Bucket: 'happimobiles', // pass your bucket name
			Key: 'orders/' +id +'/'+ ref , // file will be saved as testBucket/contacts.csv
			ContentType: file.type,
			Body: file,
			ACL: "public-read"
		};


		bucket.upload(params, function (err, data) {
			if (err) {
				console.log('There was an error uploading your file: ', err);
				//return false;
			}
			console.log('Successfully uploaded file.', data);
			//return true;
			cb(err, ref);
		});
	}
	uploadInstaFile(file, cb) {

		console.log(file);
		const contentType = file.type;

		if (this.getFileExtension(file.name) == 'jpg' || this.getFileExtension(file.name) == 'JPEG' || this.getFileExtension(file.name) == 'png') {

			
		} else {
			console.log('There was an error uploading your file: jpg');
			return;
		}

		const bucket = new S3({
			accessKeyId: "AKIAXYKJUA4RH324TEFZ",
			secretAccessKey: "QcvWJpf48E8GKTCIJLMm9e7manPKZjXFbLZO3Nbu",
		});

		var ref = this.makeid(8) + '-' + new Date().getTime();

		const params = {
			Bucket: 'happimobiles', // pass your bucket name
			Key: 'instagram-images/' + ref + "." + this.getFileExtension(file.name), // file will be saved as testBucket/contacts.csv
			ContentType: file.type,
			Body: file,
			ACL: "public-read"
		};

		bucket.upload(params, function (err, data) {
			if (err) {
				console.log('There was an error uploading your file: ', err);
				//return false;
			}
			console.log('Successfully uploaded file.', data);
			//return true;
			// console.log(params['key'])

			cb(err, data.key);
		});
	}

	uploadVideo(file, cb) {

		console.log(file);
		const contentType = file.type;

		const bucket = new S3({
			accessKeyId: "AKIAXYKJUA4RH324TEFZ", 
			secretAccessKey: "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",
			region:'ap-south-1'
		});

		var ref = this.makeid(8) + '-' + new Date().getTime()+ "." + this.getFileExtension(file.name);

		const params = {
			Bucket: 'happiwedding', // pass your bucket name
			Key: `videos/` + ref , // file will be saved as testBucket/contacts.csv
			ContentType: file.type,
			Body: file,
			ACL: "public-read"
		};
          

		bucket.upload(params, function (err, data) {
			if (err) {
				console.log('There was an error uploading your file: ', err);
				//return false;
			}
			console.log('Successfully uploaded file.', data);
			//return true;
			cb(err, ref);
		});
	}

deleteImage(path)
{
	const bucket = new S3({
		accessKeyId: "AKIAXYKJUA4RH324TEFZ", 
		secretAccessKey: "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",
		region:'ap-south-1'
	});
	bucket.deleteObject({
  Bucket: "happiwedding",
     Key: path
},function (err,data){
	console.log(err)
	console.log(data);
})
}
}

