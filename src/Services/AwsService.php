<?php


namespace App\Services;

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;
use Aws\Credentials\Credentials;
use Elastica\Exception\NotFoundException;
use Exception;
use Psr\Http\Message\RequestInterface;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AwsService
{
    /**
     * @var String
     */
    private $key;
    /**
     * @var String
     */
    private $secret;
    /**
     * @var String
     */
    private $bucket;

    /**
     * @var String
     */
    private $url;

    /**
     * @var String
     */
    private $region;
    public function __construct(String $Key, String $secret, String $bucket, String $region)
    {

        $this->key = $Key;
        $this->secret = $secret;
        $this->bucket = $bucket;
        $this->region = $region;

        $this->url = "https://slideguide2.s3.eu-west-2.amazonaws.com";
            //"https://slideguide1.s3.eu-west-3.amazonaws.com";
    }
 /**
     * @param User $user
     * @param String $path
     * @param String $file_type
     * @return String
     */
    public function getUrl(): String
    {
        return  uniqid() . ".jpeg";
    }

    /**
     * @param String $url
     */
    public function setUrl(String $url): void
    {
        $this->url = $url;
    }

    /**
     * @return string[]
     * @throws \Exception
     */

    public function preSignUrl()
    {
    
        $credentials = new Credentials($this->key, $this->secret);

 
        try {
            $s3 = new S3Client([
                'version' => 'latest',
                'region' => $this->region,
                'credentials' => [
                    'key' => $this->key,
                    'secret' => $this->secret,
                ],
            ]);
            $cmd = $s3->getCommand('PutObject', [
                'Bucket' => $this->bucket,
                'Key' => $this->getUrl(),
                'ContentType'=> 'image/jpeg'
            ]);
            
            /** @var RequestInterface $request */
            $request = $s3->createPresignedRequest($cmd, '+20 minutes');
            $uri = $request->getUri();
            return ["uri"=>(string)$uri, "host" => $uri->getHost(), "path"=> $uri->getPath()];
        } catch (\Exception $e) {
            var_dump($e->getMessage());
            throw new Exception($e->getMessage()) ;
        }



    }

}