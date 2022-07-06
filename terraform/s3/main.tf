resource "aws_s3_bucket" "cloudfront_logs" {
  bucket        = "${var.fqdn_name}-cloudfront-logs"
  acl           = "private"
  force_destroy = true
}

resource "aws_s3_bucket" "web" {
  bucket = var.bucket_name
  acl    = "private"
  policy = templatefile("bucket-policy.json", {
    "bucket_name" = var.bucket_name
  })

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
  force_destroy = true
}

resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.web.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

resource "aws_cloudfront_distribution" "main" {
  origin {
    domain_name = "${var.bucket_name}.s3-${var.aws_region}.amazonaws.com"
    origin_id   = "S3-${var.fqdn_name}"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.main.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [var.fqdn_name]

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = var.certificate_arn
    minimum_protocol_version       = "TLSv1.2_2021"
    ssl_support_method             = "sni-only"
  }

  retain_on_delete = false

  logging_config {
    include_cookies = true
    bucket          = "${aws_s3_bucket.cloudfront_logs.id}.s3.amazonaws.com"
    prefix          = "log/"
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${var.fqdn_name}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    cache_policy_id        = data.aws_cloudfront_cache_policy.managed_caching_optimized.id
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}


resource "aws_cloudfront_origin_access_identity" "main" {
  comment = "Origin Access Identity for s3 ${var.bucket_name}"
}