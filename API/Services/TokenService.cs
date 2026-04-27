using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenKey = config["TokenKey"] ?? throw new Exception("TokenKey is not configured");
        if (tokenKey.Length < 64 ) throw new Exception("TokenKey is invalid");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
        //cerate a signing credentials list 
        var claims = new List<Claim>
        {
            new (ClaimTypes.Email, user.Email),
            new (ClaimTypes.NameIdentifier, user.Id)
        };
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
        //create a token descriptor to describe the token
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };
        //we create a token handler to create the token
        var tokenHandler = new JwtSecurityTokenHandler();
        //we create the token using the token handler and the token descriptor 
        var token = tokenHandler.CreateToken(tokenDescriptor);
        //write the token to a string and return it becuase the client needs a string to use as a token
        return tokenHandler.WriteToken(token);
    }
}
