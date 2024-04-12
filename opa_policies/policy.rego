package company.contactregistration

import data.company.contactregistration.eval
import data.company.contactregistration.token

default allow := false

# curl -X POST http://opa:8181/v1/data/company/contactregistration -d @./input.json -H 'Content-Type: application/json'

allow {
    eval.allow
    eval.not_denied
    token_allow
}

# Token verification
token_allow {
	token.allow
}