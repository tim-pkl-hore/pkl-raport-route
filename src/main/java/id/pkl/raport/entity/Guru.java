package id.pkl.raport.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="guru")
public class Guru {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotBlank
	@Column(name="nama")
	private String nama;
	
	@NotBlank
	@Email
	@Column(name="email")
	private String email;
	
	@OneToMany(fetch = FetchType.LAZY, cascade= CascadeType.ALL)
	@JoinTable(name="guru_mengajar_matapelajaran",
		joinColumns = @JoinColumn(name="guru_id", referencedColumnName="id", unique = true),
		inverseJoinColumns = @JoinColumn(name="mata_pelajaran_id", referencedColumnName="id", unique = true))
	private Set<MataPelajaran> mataPelajaran = new HashSet<>();
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNama() {
		return nama;
	}

	public void setNama(String nama) {
		this.nama = nama;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<MataPelajaran> getMataPelajaran() {
		return mataPelajaran;
	}

	public void setMataPelajaran(Set<MataPelajaran> mataPelajaran) {
		this.mataPelajaran = mataPelajaran;
	}
	
	
	
}
