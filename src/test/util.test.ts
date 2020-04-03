import {expect, assert} from 'chai';
import 'mocha';
import * as Util from '../util/util';
import fs from 'fs';
import {config} from './config.test';

const con = config;

describe('VALID', () => {

    const imageURl = con.imageURL;

    let filteredImage:string;
    it('should create a new filtered image', async () => {
         filteredImage = await Util.filterImageFromURL(imageURl);
         console.log(filteredImage);
        expect(fs.existsSync(filteredImage)).to.be.true;
    });

    it('should delete temp image file', async () => {
        var files:string[] = [];
        files.push(filteredImage);
        await Util.deleteLocalFiles(files);
        expect(fs.existsSync(filteredImage)).to.be.false;
    })

    
});

describe('INVALID', () => {

    const imageURl = con.invalidImageURL;

    let filteredImage:string;
    it('should return rejected promise on Invalid Image URL', async () => {
         await Util.filterImageFromURL(imageURl)
            .then(() => Promise.reject(new Error('Expected method to reject.')),
             err => assert.equal(err, 400));
    });
    
})