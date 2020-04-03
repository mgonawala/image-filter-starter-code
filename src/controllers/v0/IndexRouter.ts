
import {Router, Request, Response} from 'express';
import * as Util from '../../util/util';
import validator from 'validator';

const router:Router = Router();


// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
router.get('/filteredImage', async (req: Request, res: Response) => {

    const {image_url} = req.query;
    
    // Validate image url
    if( image_url === undefined || image_url === ''  || !validator.isURL(image_url)){
        res.status(409).send({message: 'Please provide valid Image URL.'});
    }
    
    const filteredImage = await Util.filterImageFromURL(image_url);

    // Send filteredImage back to user and delete the file on completion.
    res.status(200).sendFile(filteredImage, err => {
        if(err){
            console.log({message: err.message});
        }
        else{
            Util.deleteLocalFiles([filteredImage]);
        }
    } );
});

export const IndexRouter:Router = router;