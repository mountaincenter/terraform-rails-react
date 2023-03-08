terraform {
  backend "s3" {
    bucket         = "terraform-tfstate-yam"
    key            = "terraform.tfstate"
    region         = "ap-northeast-1"
    dynamodb_table = "terraform-tfstate-locking"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}


provider "aws" {
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key_id
  region     = var.aws_region
}

provider "aws" {
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key_id
  region     = "us-east-1"
  alias      = "virginia"
}
