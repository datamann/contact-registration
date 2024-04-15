package company.contactregistration.token

# Postman (API) support
# input.user.tokenValue

default allow := false

allow {
	not jwt_token_expired
	input.user.claims.azp == "contact-registration"
}

allow {
	# Can be used if token verification is enabled.
	decode_verify.payload.azp == "contact-registration"
	decode_verify.isValid
}

# Can be used if token verification is enabled.
### Token from the user input ###
# bearer_token := t {
# 	v := input.user.idToken.tokenValue
# 	startswith(v, "Bearer ")
# 	t := substring(v, count("Bearer "), -1)
# }

bearer_token := v {
	v := input.user.tokenValue
}

### Can be used if token verification is enabled.
### Full JWKS Keys stringified ###
jwks := j {
	j := "{\"keys\":[{\"kid\":\"Ox_ZgcgFPbld7Hq7mlsySKBGm3k8wCDfOD85cn8NPrM\",\"kty\":\"RSA\",\"alg\":\"RSA-OAEP\",\"use\":\"enc\",\"n\":\"raKzfoHZbimLfn3ZkJabwfB977gZWLYzHFShUjZAvKa3-g6ZDg4fRhKVZ4FQt5yO4Ony27ehCaQLCmfOqM4Y2TTI30D4wgpm43ZiNDd7nAWsEfUdlmVewGixs4PExHrc6bob1vcOolHNicVRvDrrJktCXJwhuDXCdDf_q5Tb1923mw637qdt-qDKvCaPxN_tMlVqbIdk9vQ_hj_QYq_T5wt70QT2AWuMsRq8Y50vmvJlWB8qnVo2sK7HxcEHDx4Lr6EWe_vTGxjq7GswMpoCxOvJ8A0JHhxHdexXwe_9Jw7O08gu4TTGckrKd4LpjLpzqGHdegfclr0DWieJoPj1xQ\",\"e\":\"AQAB\",\"x5c\":[\"MIICmzCCAYMCBgGOw29wbzANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjQwNDA5MTUxNTQ0WhcNMzQwNDA5MTUxNzI0WjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCtorN+gdluKYt+fdmQlpvB8H3vuBlYtjMcVKFSNkC8prf6DpkODh9GEpVngVC3nI7g6fLbt6EJpAsKZ86ozhjZNMjfQPjCCmbjdmI0N3ucBawR9R2WZV7AaLGzg8TEetzpuhvW9w6iUc2JxVG8OusmS0JcnCG4NcJ0N/+rlNvX3bebDrfup236oMq8Jo/E3+0yVWpsh2T29D+GP9Bir9PnC3vRBPYBa4yxGrxjnS+a8mVYHyqdWjawrsfFwQcPHguvoRZ7+9MbGOrsazAymgLE68nwDQkeHEd17FfB7/0nDs7TyC7hNMZySsp3gumMunOoYd16B9yWvQNaJ4mg+PXFAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAJbSBJyYoTntNmFJYVQJpjV7P4Y8bD626gk0hvZMbnXIrr5iCFNA5zxzz96OCqiUaEtkW9f3YtOyzyM+1lfxcMxl+dleteA8zuOo800+2+Af9bkO+R/kyWyzPafDBvF3rmrASCc5sRdXkLU2yxNVs0nkfWOrzgNP6VP11Z7qU/6/IkjHx6SqkxtpsgXETyX6aXrt2r1LTN/tu3Ho2sFQLVqzJmlzuSFJHgcewquryNq7VzL/HytXHsSD+DWJ4uLcUrKbWB3ZqbosCg21uH7gYf8cVuFz9AHyHbH8AhAAmFfF22eZ89T9V/jrw7Jn5dEZYe5emHDXalBm1/3oZMjnc1Y=\"],\"x5t\":\"_Rcha-zr_8yj1e0bTKT2zFT4ugs\",\"x5t#S256\":\"ElsJIO6X0Xs777ObwsjfqLZyqrL_p1f3VTEU1IERiRc\"},{\"kid\":\"uAhikf0zyEh0hpqLRcUAdeY8mu991k3UMV1BxbSeY2I\",\"kty\":\"RSA\",\"alg\":\"RS256\",\"use\":\"sig\",\"n\":\"zlp8Y1KYbkiTvHHwBqDn7U40RvGIFxJW7elXxxFiQ1sPztKH1NA-gZa9VTaa3Eh3QxTr4SQTeGBQXHFOUIrEbi4OPZB28kT9PXVHxlO3JMsPBWgVNSISn9-8b4biD_8y4p1hu_yPwSjyYG2hgSCj8yLbKxXQMnZ2e5n7mGM2yjQHjldzn7aZ_AhiSZRtfQ_COZnI1xxT2rFMGvrc4cVLt-i4Ci8sAK-vVPeQ01zqosMUGYvPrtGbGuyx-RrRmteifZby8CCqPK_YuU-Kkn9OioI7fQeXpYSe9BkmuaR1olnF8k04jxZEUS1gWKW5SJgRVAie4GnXWc4oWLaw-HiRBw\",\"e\":\"AQAB\",\"x5c\":[\"MIICmzCCAYMCBgGOw29uiDANBgkqhkiG9w0BAQsFADARMQ8wDQYDVQQDDAZtYXN0ZXIwHhcNMjQwNDA5MTUxNTQzWhcNMzQwNDA5MTUxNzIzWjARMQ8wDQYDVQQDDAZtYXN0ZXIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDOWnxjUphuSJO8cfAGoOftTjRG8YgXElbt6VfHEWJDWw/O0ofU0D6Blr1VNprcSHdDFOvhJBN4YFBccU5QisRuLg49kHbyRP09dUfGU7ckyw8FaBU1IhKf37xvhuIP/zLinWG7/I/BKPJgbaGBIKPzItsrFdAydnZ7mfuYYzbKNAeOV3Oftpn8CGJJlG19D8I5mcjXHFPasUwa+tzhxUu36LgKLywAr69U95DTXOqiwxQZi8+u0Zsa7LH5GtGa16J9lvLwIKo8r9i5T4qSf06Kgjt9B5elhJ70GSa5pHWiWcXyTTiPFkRRLWBYpblImBFUCJ7gaddZzihYtrD4eJEHAgMBAAEwDQYJKoZIhvcNAQELBQADggEBALzjsxHIrYCMCu9VnVHZTWAejzgedVVp3q3Pff+94K19JLAurkJv2i0+TxHRS6thCenX/w67yhykU47T3wWtLYntDbeC+J6AQCxb6tb43yd6wQ6Zn+nrbDjnCgfbB1yhDlMmKg3zvoUHCYBUoFXBQDum6++fzb7Cw43NE5xA6bgfnnBuH0Pe4UpMlmnw+uCEfvPjkYgz6pozpG8S/slfmSkkg8BHHz0jCXPJIe+C241D1ZcRoemHgD1Y4WDo3MlcFmngnetTeS2N1qLVHZYGxZfMuMbb5YxX1We/jKUe5Th4IADAeAm6WaqQE3ZaullWGeBUd/aS/PeqGe7CHNuYAp8=\"],\"x5t\":\"KRD9-LXaHWFoiIzq1kPulZDQn9Q\",\"x5t#S256\":\"rBvjwA8CtC-LNDYWtZBMVG49DWYL2yvHZ0Zcpr5h9_U\"}]}"
}

### Can be used if token verification is enabled.
decode_verify = { "isValid": isValid, "header": header, "payload": payload } {
     [isValid, header, payload] := io.jwt.decode_verify(bearer_token, { "cert": jwks, "iss": "http://mykeycloak:8080/realms/company" })
}

### Can be used if token verification is enabled.
token_payload := decode_verify.payload

jwt_token_expired {
	token_payload.exp < time_now_s
}

time_now_s := time.now_ns() / 1000000000