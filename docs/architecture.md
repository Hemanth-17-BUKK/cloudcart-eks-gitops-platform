# CloudCart Architecture

This document explains the architecture of the CloudCart multi-microservice platform.

## High-Level Architecture

User traffic enters through an AWS Application Load Balancer and is routed to services running on Amazon EKS.

## Services

- frontend-service
- auth-service
- user-service
- order-service
- notification-service

## Managed Services

- RDS PostgreSQL
- Redis
- SQS
