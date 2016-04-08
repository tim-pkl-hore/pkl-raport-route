package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="kelas")
public class Kelas{
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="tingkat", referencedColumnName="id")
	private Tingkat tingkat;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="grup", referencedColumnName="id")
	private GrupKelas grupKelas;
	
	@NotNull
	@OneToOne
	@JoinColumn(name="wali_kelas", referencedColumnName="id")
	private Guru waliKelas;
	
	@NotNull
	@OneToOne
	@JoinColumn(name="tahun_ajaran", referencedColumnName="id")
	private TahunAjaran tahunAjaran;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Tingkat getTingkat() {
		return tingkat;
	}

	public void setTingkat(Tingkat tingkat) {
		this.tingkat = tingkat;
	}

	public GrupKelas getGrupKelas() {
		return grupKelas;
	}

	public void setGrupKelas(GrupKelas grupKelas) {
		this.grupKelas = grupKelas;
	}

	public Guru getWaliKelas() {
		return waliKelas;
	}

	public void setWaliKelas(Guru waliKelas) {
		this.waliKelas = waliKelas;
	}

	public TahunAjaran getTahunAjaran() {
		return tahunAjaran;
	}

	public void setTahunAjaran(TahunAjaran tahunAjaran) {
		this.tahunAjaran = tahunAjaran;
	}
}
